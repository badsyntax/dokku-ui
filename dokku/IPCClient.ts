import net from 'net';

export class IPCClient {
  public isReady = false;
  public socket: net.Socket;

  constructor(private readonly socketPath: string) {
    this.connect();
  }

  private connect(): void {
    this.socket = net
      .createConnection(this.socketPath)
      .on('connect', this.handleConnect)
      .on('end', this.handleEnd)
      .on('error', this.handleError);
  }

  private handleConnect = (): void => {
    console.log('IPCClient', `Connected to ${this.socketPath}`);
    this.isReady = true;
  };

  private handleError = (data): void => {
    console.error('IPCClient', data);
  };

  private handleEnd = (): void => {
    this.isReady = false;
  };

  public waitForReady(): Promise<void> {
    return new Promise((res) => {
      if (this.isReady) {
        res();
      } else {
        this.socket.once('connect', res);
      }
    });
  }

  public dispose(): void {
    this.socket.end();
  }
}
