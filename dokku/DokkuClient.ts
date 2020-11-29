import { DOKKU_SOCKET_PATH } from '../constants/constants';
import { IPCClient } from './IPCClient';

interface DokkuResponse {
  ok: boolean;
  output: string;
}

export class DokkuClient extends IPCClient {
  public async runCommand(command: string): Promise<DokkuResponse> {
    await this.waitForReady();
    return new Promise((resolve, reject) => {
      this.socket.once('data', (data) => {
        try {
          const response = JSON.parse(
            data.toString('utf-8').replace('\n', '\\n')
          );
          if (!response.ok) {
            reject(new Error(response.output || `Error running ${command}`));
          } else {
            resolve(response);
          }
        } catch (e) {
          reject(e);
        }
      });
      this.socket.write(`--quiet ${command}`);
    });
  }

  public async getApps(): Promise<string[]> {
    const response = await this.runCommand('apps:list');
    const apps = response.output.split('\n');
    return apps;
  }
}

export const dokkuClient = new DokkuClient(DOKKU_SOCKET_PATH);
