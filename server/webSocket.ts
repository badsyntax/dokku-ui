import WebSocket from 'ws';
import { ServerMessage } from '../ws/types';

function handleSocketMessage(socket: WebSocket): (message: string) => void {
  return (message) => {
    const parsedMessage = JSON.parse(message);
    switch (parsedMessage.command) {
      case 'getAppData': {
        const message: ServerMessage = {
          command: parsedMessage.command,
          data: {
            name: parsedMessage.options.app,
          },
        };
        socket.send(JSON.stringify(message));
        break;
      }
    }
  };
}

export const initWsRouter = (socket: WebSocket): void => {
  socket.on('message', handleSocketMessage(socket));
};
