import {
  MessageSubscription,
  ServerMessage,
  ClientMessage,
  MessageCallback,
} from '../ws/types';

export class WebSocketAPI {
  private isReady = false;
  private socket: WebSocket;
  private subscriptions: MessageSubscription[] = [];
  constructor(private readonly url: string) {
    try {
      this.socket = new window.WebSocket(url);
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
      console.error('Unable to parse message:', e.message);
    }
  };

  private handleError = (event) => {
    console.error('WS error', event);
  };

  private callSubscriptions(message: ServerMessage) {
    this.subscriptions.forEach((subscription) => {
      if (subscription.message.command === message.command) {
        subscription.callback(message);
      }
    });
  }

  private subscribe(subscription: MessageSubscription) {
    this.subscriptions.push(subscription);
  }

  private unsubscribe(subscription: MessageSubscription) {
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

  protected async sendMessage(
    message: ClientMessage,
    callback: MessageCallback
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
