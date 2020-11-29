import net from 'net';
import { DOKKU_SOCKET_PATH } from '../constants/constants';

net
  .createServer()
  .on('connection', (stream) => {
    console.log('Server: client connected');

    stream.setEncoding('utf-8');

    stream.on('end', () => {
      console.log('Server: client disconnected');
    });

    stream.on('data', (msg) => {
      const command = msg
        .toString('utf-8')
        .replace(/--[a-z]+\s/g, '')
        .split(' ')[0];
      console.log('Server: got command:', command);
      switch (command) {
        case 'apps:list':
          stream.write('{"ok":true,"output":"demo-app\nnew-app"}');
          break;
        case 'storage:list':
          stream.write('{"ok":true,"output":"demo-app\nnew-app"}');
          break;
        default:
          stream.write(
            `{"ok":false,"output":"Command '${command}' not mocked"}`
          );
      }
    });
  })
  .on('close', () => {
    console.log('Server: shut down');
  })
  .listen(DOKKU_SOCKET_PATH, () => {
    console.log('Server bound to socket at path:', DOKKU_SOCKET_PATH);
  });
