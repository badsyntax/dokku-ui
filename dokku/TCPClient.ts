import net from 'net';

export class TCPClient {
  public isReady = false;
  public socket: net.Socket;

  constructor(private readonly port: number, private readonly host: string) {
    this.connect();
  }

  private connect(): void {
    console.log('TCPClient', `Connecting to ${this.host}:${this.port}`);
    this.socket = new net.Socket()
      .connect(this.port, this.host)
      .on('error', this.handleError)
      .on('connect', this.handleConnect)
      .on('end', this.handleEnd)
      .on('close', this.handleEnd);
  }

  private handleConnect = (): void => {
    this.isReady = true;
  };

  private handleError = (data): void => {
    console.error('TCPClient', data);
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
