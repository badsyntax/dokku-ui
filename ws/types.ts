export interface ClientMessage {
  command: string;
  options: Record<string, string>;
}

export interface ServerMessage {
  command: string;
  data: Record<string, string>;
}

export type MessageCallback = (message: ServerMessage) => void;

export interface MessageSubscription {
  message: ClientMessage;
  callback: MessageCallback;
}
