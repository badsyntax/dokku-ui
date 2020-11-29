import WebSocket from 'ws';
import { dockerClient } from '../docker/DockerClient';
import { WsClientMessage, WsServerMessage } from '../api/types';
import { Stream, Writable } from 'stream';
import { WS_SERVER_PORT } from '../constants/constants';

function isStream(stream: any): stream is Stream {
  return 'pipe' in stream;
}

async function streamContainerStats(
  clientMessage: WsClientMessage,
  server: WebSocket.Server,
  socket: WebSocket,
  containerId: string
) {
  const container = dockerClient.getContainer(containerId);
  const statsStream = await container.stats({
    stream: true,
  });

  if (isStream(statsStream)) {
    statsStream.pipe(
      new Writable({
        write(chunk, encoding, next) {
          const serverMessage: WsServerMessage = {
            command: clientMessage.command,
            data: JSON.parse(chunk.toString('utf-8')),
          };
          socket.send(JSON.stringify(serverMessage));
          next();
        },
      })
    );
  }
}

function handleSocketMessage(
  server: WebSocket.Server,
  socket: WebSocket
): (message: string) => void {
  return (message) => {
    const parsedMessage = JSON.parse(message) as WsClientMessage;
    switch (parsedMessage.command) {
      case 'getAppData': {
        const containerId = 'ced37f5c3493';
        streamContainerStats(parsedMessage, server, socket, containerId);
        // condockerClient.getContainer
        // ({
        //   filters: {
        //     dangling: {
        //       true: true,
        //     },
        //   },
        // }),

        // const message: WsServerMessage = {
        //   command: parsedMessage.command,
        //   data: {
        //     name: parsedMessage.options.app,
        //   },
        // };
        // socket.send(JSON.stringify(message));
        break;
      }
    }
  };
}

const initWsRouter = (server: WebSocket.Server) => (
  socket: WebSocket
): void => {
  socket.on('message', handleSocketMessage(server, socket));
};

export const initWebSocketServer = () => {
  const wsServer = new WebSocket.Server({ port: WS_SERVER_PORT });
  wsServer.on('connection', initWsRouter(wsServer));
  console.log(`> WebSocket server started on ws://localhost:${WS_SERVER_PORT}`);
};
