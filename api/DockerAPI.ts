import { ImageInfo } from 'dockerode';
import { HttpAPI } from './HttpAPI';

export type GetImagesResponse = {
  dangling: ImageInfo[];
  nonDangling: ImageInfo[];
};

export class DockerAPI extends HttpAPI {
  getImages(): Promise<GetImagesResponse> {
    return this.getJson<GetImagesResponse>('images');
  }
}

export const dockerAPI = new DockerAPI('/api/docker');
