import { SOCKET_PATH } from './constants';
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
          resolve(JSON.parse(data.toString('utf-8').replace('\n', '\\n')));
        } catch (e) {
          reject(e);
        }
      });
      this.socket.write(`--quiet ${command}`);
    });
  }

  public async getApps(): Promise<string[]> {
    const response = await this.runCommand('apps:list');
    if (!response.ok) {
      throw new Error(`Unable to get apps - ${response.output}`);
    }
    const apps = response.output.split('\n');
    return apps;
  }
}

export const dokkuClient = new DokkuClient(SOCKET_PATH);
