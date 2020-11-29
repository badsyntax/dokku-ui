import { createServer } from 'http';
import next from 'next';
import WebSocket from 'ws';
import { initWsRouter } from './webSocket';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const requestHandler = app.getRequestHandler();

const wsServer = new WebSocket.Server({ port: 8080 });
wsServer.on('connection', initWsRouter);

console.log('> WebSocket server started on ws://localhost:8080');

app.prepare().then(() => {
  createServer(requestHandler).listen(3000, (): void => {
    console.log('> Ready on http://localhost:3000');
  });
});
