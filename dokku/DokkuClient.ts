import { SOCKET_PATH } from './constants';
import { IPCClient } from './IPCClient';

export class DokkuClient extends IPCClient {
  public async runCommand(command: string): Promise<string> {
    await this.waitForReady();
    return new Promise((res) => {
      this.socket.once('data', (data) => res(data.toString('utf-8')));
      this.socket.write(command);
    });
  }
}

export const dokkuClient = new DokkuClient(SOCKET_PATH);
