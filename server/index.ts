import { createServer } from 'http';
import next from 'next';
import { SERVER_PORT } from '../constants/constants';
import { initWebSocketServer } from './webSocketServer';

initWebSocketServer();

console.log('> Preparing app...');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const requestHandler = app.getRequestHandler();

app.prepare().then(() => {
  createServer(requestHandler).listen(SERVER_PORT, (): void => {
    console.log(`> Ready on http://localhost:${SERVER_PORT}`);
  });
});
