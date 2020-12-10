export interface WsClientMessage {
  command: string;
  options: Record<string, string>;
}

export interface WsServerMessage<T> {
  command: string;
  data: T;
}

export type WsMessageCallback<T> = (message: WsServerMessage<T>) => void;

export interface WsMessageSubscription<T = any> {
  message: WsClientMessage;
  callback: WsMessageCallback<T>;
}

export enum WsCommands {
  getAppData = 'getAppData',
}

export interface ApiResponse<DataType = unknown> {
  ok: boolean;
  message?: string;
  data?: DataType;
}
