import { MessageCallback, WebSocketAPI } from './WebSocketAPI';

export class StreamingAPI extends WebSocketAPI {
  getAppData(app: string, callback: MessageCallback): Promise<() => void> {
    return this.sendMessage(
      {
        command: 'getAppData',
        options: {
          app,
        },
      },
      callback
    );
  }
}

export const streamingAPI = new StreamingAPI('ws://localhost:8080');
