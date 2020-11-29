import { ContainerStats } from 'dockerode';
import { WS_SERVER_PORT } from '../constants/constants';
import { WsMessageCallback } from './types';
import { WebSocketAPI } from './WebSocketAPI';

export class StreamingAPI extends WebSocketAPI {
  getAppData(
    app: string,
    callback: WsMessageCallback<ContainerStats>
  ): Promise<() => void> {
    return this.sendMessage<ContainerStats>(
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

export const streamingAPI = new StreamingAPI(
  `ws://localhost:${WS_SERVER_PORT}`
);
