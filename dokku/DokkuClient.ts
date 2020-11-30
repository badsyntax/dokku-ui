import { DOKKU_SOCKET_PATH } from '../constants/constants';
import { IPCClient } from './IPCClient';
import {
  AppStorageVolume,
  AppDomains,
  AppNetwork,
  AppProxyPort,
  AppProxyInfo,
} from './types';

interface DokkuResponse {
  ok: boolean;
  output: string;
}

export class DokkuClient extends IPCClient {
  public async runCommand(command: string): Promise<DokkuResponse> {
    return this.waitForReady().then(
      () =>
        new Promise((resolve, reject) => {
          function handleData(data) {
            try {
              const response = JSON.parse(
                data.toString('utf-8').replace(/\n/g, '\\n')
              );
              if (!response.ok) {
                throw new Error(response.output || `Error running ${command}`);
              } else {
                resolve(response);
              }
            } catch (e) {
              reject(e);
            }
          }
          this.socket.once('data', handleData);
          this.socket.write(`--quiet ${command}`);
        })
    );
  }

  public async getApps(): Promise<string[]> {
    const response = await this.runCommand('apps:list');
    return response.output.split('\n');
  }

  public async getAppData(app: string): Promise<string[]> {
    const response = await this.runCommand(`report ${app}`);
    return response.output.split('\n');
  }

  public async getAppStorage(app: string): Promise<AppStorageVolume[]> {
    const response = await this.runCommand(`storage:list ${app}`);
    return response.output.split('\n').map((volume) => {
      const [host, container] = volume.split(':');
      return { host, container };
    });
  }

  public async getAppDomains(app: string): Promise<AppDomains> {
    const keyMapping = {
      'Domains app enabled': 'enabled',
      'Domains app vhosts': 'vhosts',
      'Domains global enabled': 'globalEnabled',
      'Domains global vhosts': 'globalVhosts',
    };
    const getValue = (key, value) => {
      switch (key) {
        case 'enabled':
        case 'globalEnabled':
          return value.toLowerCase() === 'true';
        case 'vhosts':
        case 'globalVhosts':
          return value.split(' ');
        default:
          return value;
      }
    };
    const response = await this.runCommand(`domains:report ${app}`);
    return response.output.split('\n').reduce<AppDomains>(
      (previousValue, currentValue) => {
        const [key, value] = currentValue.split(':');
        const shortKey = keyMapping[key.trim()];
        return {
          ...previousValue,
          [shortKey]: getValue(shortKey, value.trim()),
        };
      },
      {
        enabled: false,
        vhosts: [],
        globalEnabled: false,
        globalVhosts: [],
      }
    );
  }

  public async getAppNetwork(app: string): Promise<AppNetwork> {
    const keyMapping = {
      'Network attach post create': 'attachPostCreate',
      'Network attach post deploy': 'attachPostDeploy',
      'Network bind all interfaces': 'bindAllInterfaces',
      'Network web listeners': 'webListeners',
    };
    const getValue = (key, value) => {
      switch (key) {
        case 'bindAllInterfaces':
          return value.toLowerCase() === 'true';
        case 'webListeners':
          return value.split(' ');
        default:
          return value;
      }
    };
    const response = await this.runCommand(`network:report ${app}`);
    return response.output.split('\n').reduce<AppNetwork>(
      (previousValue, currentValue) => {
        const [key, ...rest] = currentValue.trim().split(':');
        const value = rest.join(':');
        const shortKey = keyMapping[key.trim()];
        return {
          ...previousValue,
          [shortKey]: getValue(shortKey, value.trim()),
        };
      },
      {
        attachPostCreate: '',
        attachPostDeploy: '',
        bindAllInterfaces: false,
        webListeners: [],
      }
    );
  }

  public async getAppProxyPorts(app: string): Promise<AppProxyPort[]> {
    const response = await this.runCommand(`proxy:ports ${app}`);
    return response.output.split('\n').map((ports) => {
      const [scheme, hostPort, containerPort] = ports
        .trim()
        .replace(/\s+/g, ' ')
        .split(' ');
      return {
        scheme,
        hostPort: Number(hostPort),
        containerPort: Number(containerPort),
      };
    });
  }

  public async getAppProxyInfo(app: string): Promise<AppProxyInfo> {
    const keyMapping = {
      'Proxy enabled': 'enabled',
      'Proxy port map': 'portMap',
      'Proxy type': 'type',
    };
    const getValue = (key, value) => {
      switch (key) {
        case 'enabled':
          return value.toLowerCase() === 'true';
        case 'portMap':
          return value.split(' ');
        default:
          return value;
      }
    };
    const response = await this.runCommand(`proxy:report ${app}`);
    return response.output.split('\n').reduce<AppProxyInfo>(
      (previousValue, currentValue) => {
        const [key, ...rest] = currentValue.trim().split(':');
        const value = rest.join(':');
        const shortKey = keyMapping[key.trim()];
        return {
          ...previousValue,
          [shortKey]: getValue(shortKey, value.trim()),
        };
      },
      {
        enabled: false,
        portMap: [],
        type: '',
      }
    );
  }

  public async getAppProcessInfo(app: string): Promise<any> {
    const response = await this.runCommand(`ps:inspect ${app}`);
    return JSON.parse(response.output);
  }
}

export const dokkuClient = new DokkuClient(DOKKU_SOCKET_PATH);
