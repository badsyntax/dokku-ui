/* eslint-disable @typescript-eslint/no-var-requires */
const net = require('net');

const socketPath = '/tmp/my.unix.sock';

net
  .createServer()
  .on('connection', (stream) => {
    console.log('Server: client connected');

    stream.setEncoding('utf-8');

    stream.on('end', () => {
      console.log('Server: client disconnected');
    });

    stream.on('data', (msg) => {
      const command = msg.toString('utf-8').replace(/--[a-z]+\s/g, '');
      console.log('Server: got command:', command);
      switch (command) {
        case 'apps:list':
          stream.write('{"ok":true,"output":"demo-app\nnew-app"}');
      }
    });
  })
  .on('close', () => {
    console.log('Server: shut down');
  })
  .listen(socketPath, () => {
    console.log('Server bound to socket at path:', socketPath);
  });
