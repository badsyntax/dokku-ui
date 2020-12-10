import { DOKKU_SOCKET_PATH } from '../constants/constants';
import { IPCClient } from './IPCClient';
import { TCPClient } from './TCPClient';
import {
  AppStorageVolume,
  AppDomains,
  AppNetwork,
  AppProxyPort,
  AppProxyInfo,
  AppProcessReport,
  AppConfig,
} from './types';

interface DokkuResponse {
  ok: boolean;
  output: string;
}

function mergeData<T>(
  obj: T,
  line: string,
  keyMapping: Record<string, string>,
  getValue: (key, value) => unknown
): T {
  const [key, ...rest] = line.trim().split(':');
  const value = rest.join(':');
  const shortKey = keyMapping[key.trim()];
  return {
    ...obj,
    [shortKey]: getValue(shortKey, value.trim()),
  };
}

function getLines(output: string): string[] {
  return output.trim().split('\n').filter(Boolean);
}

function parseLines<T>(response: DokkuResponse, lineParser: (line) => T): T[] {
  return getLines(response.output).map(lineParser);
}

export class DokkuClient {
  constructor(private readonly client: TCPClient | IPCClient) {}

  public async runCommand(command: string): Promise<DokkuResponse> {
    return this.client.waitForReady().then(
      () =>
        new Promise((resolve, reject) => {
          function handleData(buffer) {
            const data = buffer.toString('utf-8').trim().replace(/\n/g, '\\n');
            let response: any;
            try {
              response = JSON.parse(data);
            } catch (e) {
              console.error('Error parsing data:', data);
              reject(e);
            }
            if (!response.ok) {
              reject(new Error(response.output || `Error running ${command}`));
            } else {
              resolve(response);
            }
          }
          this.client.socket.once('data', handleData);
          this.client.socket.write(`--quiet ${command}\n`);
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
    return parseLines<AppStorageVolume>(response, (volume) => {
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
          return value.split(' ').filter(Boolean);
        default:
          return value;
      }
    };

    const response = await this.runCommand(`domains:report ${app}`);
    return getLines(response.output).reduce<AppDomains>(
      (previousValue, currentValue) =>
        mergeData<AppDomains>(
          previousValue,
          currentValue,
          keyMapping,
          getValue
        ),
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
          return value.split(' ').filter(Boolean);
        default:
          return value;
      }
    };
    const response = await this.runCommand(`network:report ${app}`);
    return getLines(response.output).reduce<AppNetwork>(
      (previousValue, currentValue) =>
        mergeData<AppNetwork>(
          previousValue,
          currentValue,
          keyMapping,
          getValue
        ),
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
    return getLines(response.output).map((ports) => {
      const [scheme, hostPort, containerPort] = ports
        .trim()
        .replace(/\s+/g, ' ')
        .split(' ')
        .filter(Boolean);
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
          return value.split(' ').filter(Boolean);
        default:
          return value;
      }
    };
    const response = await this.runCommand(`proxy:report ${app}`);
    return getLines(response.output).reduce<AppProxyInfo>(
      (previousValue, currentValue) =>
        mergeData<AppProxyInfo>(
          previousValue,
          currentValue,
          keyMapping,
          getValue
        ),
      {
        enabled: false,
        portMap: [],
        type: '',
      }
    );
  }

  public async getAppProcessInfo(app: string): Promise<any> {
    const response = await this.runCommand(`ps:inspect ${app}`);
    const processInfo = JSON.parse(response.output);
    return processInfo;
  }

  public async getAppProcessReport(app: string): Promise<AppProcessReport> {
    // return Promise.resolve({
    //   deployed: false,
    //   processes: 0,
    //   psCanScale: true,
    //   psRestartPolicy: 'on-failure:10',
    //   restore: true,
    //   running: false,
    // });
    const keyMapping = {
      Deployed: 'deployed',
      Processes: 'processes',
      'Ps can scale': 'psCanScale',
      'Ps restart policy': 'psRestartPolicy',
      Restore: 'restore',
      Running: 'running',
    };
    const getValue = (key, value) => {
      switch (key) {
        case 'deployed':
        case 'psCanScale':
        case 'restore':
        case 'running':
          return value.toLowerCase() === 'true';
        case 'processes':
          return Number(value);
        default:
          return value;
      }
    };

    const response = await this.runCommand(`ps:report ${app}`);
    const processReport = getLines(response.output).reduce<AppProcessReport>(
      (previousValue, currentValue) =>
        mergeData<AppProcessReport>(
          previousValue,
          currentValue,
          keyMapping,
          getValue
        ),
      {
        deployed: false,
        processes: 0,
        psCanScale: false,
        psRestartPolicy: null,
        restore: false,
        running: false,
      }
    );
    return processReport;
  }

  public async createApp(app: string): Promise<string> {
    // TODO: request validation
    // if (!appName) {
    //   throw new Error();
    // }
    const response = await this.runCommand(`apps:create ${app}`);
    return response.output;
  }

  public async getAppConfig(app: string): Promise<AppConfig[]> {
    const response = await this.runCommand(`config:show ${app}`);
    return parseLines<AppConfig>(response, (config) => {
      const [key, value] = config.split(':');
      return { key: key.trim(), value: value.trim() };
    });
  }

  public async addAppConfig(
    app: string,
    key: string,
    value: string
  ): Promise<string> {
    const response = await this.runCommand(
      `config:set --no-restart ${app} ${key}=${value}`
    );
    return response.output;
  }

  public async deployApp(
    app: string,
    dockerImage: string,
    tag = 'latest'
  ): Promise<string> {
    const response2 = await this.runCommand(`tags:deploy ${app} ${tag}`);
    return response2.output;
  }
}

const client = new IPCClient(DOKKU_SOCKET_PATH);
export const dokkuClient = new DokkuClient(client);
