// eslint-disable-next-line @typescript-eslint/no-var-requires
const net = require('net');

const socketPath = '/tmp/my.unix.sock';

const server = net
  .createServer()
  .on('connection', (stream) => {
    console.log('Server: client connected');

    stream.setEncoding('utf-8');

    stream.on('end', () => {
      console.log('Server: client disconnected');
    });

    stream.on('data', (msg) => {
      console.log('Server: got client message:', msg);
      switch (msg.toString()) {
        case 'apps:list':
          stream.write(['app1', 'app2'].join('\n'));
      }
    });
  })
  .on('close', () => {
    console.log('Server: shut down');
  })
  .listen(socketPath, () => {
    console.log('Server bound to socket at path:', socketPath);
  });
