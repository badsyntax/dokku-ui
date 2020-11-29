import Docker from 'dockerode';
import { DOCKER_SOCKET_PATH } from '../constants/constants';

export const dockerClient = new Docker({ socketPath: DOCKER_SOCKET_PATH });
