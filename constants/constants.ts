const isProd = process.env.NODE_ENV === 'production';
export const SERVER_PORT = 3000;
export const WS_SERVER_PORT = 3001;
export const DOKKU_SOCKET_PATH = !isProd
  ? '/tmp/dokku-daemon.sock'
  : '/var/run/dokku-daemon/dokku-daemon.sock';
export const DOCKER_SOCKET_PATH = '/var/run/docker.sock';
