import {
  WsMessageSubscription,
  WsServerMessage,
  WsClientMessage,
  WsMessageCallback,
} from './types';

export class WebSocketAPI {
  private isReady = false;
  private socket: WebSocket;
  private subscriptions: WsMessageSubscription[] = [];
  constructor(private readonly url: string) {
    try {
      this.socket = new WebSocket(url);
      this.socket.addEventListener('error', this.handleError);
      this.socket.addEventListener('message', this.handleMessage);
      this.socket.addEventListener('open', this.handleOpen);
    } catch (e) {
      console.error('WS error2', e.message);
    }
  }

  private handleOpen = (): void => {
    this.isReady = true;
  };

  private handleMessage = (event) => {
    try {
      this.callSubscriptions(JSON.parse(event.data));
    } catch (e) {
      console.error('Unable to parse message:', e.message, event.data);
    }
  };

  private handleError = (event) => {
    console.error('WS error', event);
  };

  private callSubscriptions(message: WsServerMessage<any>) {
    console.log('callSubscriptions', message);
    this.subscriptions.forEach((subscription) => {
      if (subscription.message.command === message.command) {
        subscription.callback(message);
      }
    });
  }

  private subscribe(subscription: WsMessageSubscription) {
    this.subscriptions.push(subscription);
  }

  private unsubscribe(subscription: WsMessageSubscription) {
    this.subscriptions.splice(this.subscriptions.indexOf(subscription), 1);
  }

  protected waitForReady(): Promise<void> {
    return new Promise((res) => {
      if (this.isReady) {
        return res();
      }
      this.socket.addEventListener('open', () => res(), {
        once: true,
      });
    });
  }

  protected async sendMessage<T>(
    message: WsClientMessage,
    callback: WsMessageCallback<T>
  ): Promise<() => void> {
    await this.waitForReady();
    const subscription = {
      message,
      callback,
    };
    this.subscribe(subscription);
    this.socket.send(JSON.stringify(message));
    return (): void => this.unsubscribe(subscription);
  }
}
