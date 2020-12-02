import { ImageInfo } from 'dockerode';
import { HttpAPI } from './HttpAPI';
import { ApiResponse } from './types';

export type GetImagesResponse = {
  dangling: ImageInfo[];
  nonDangling: ImageInfo[];
};

export class DockerAPI extends HttpAPI {
  getImages(): Promise<ApiResponse<GetImagesResponse>> {
    return this.getJson<GetImagesResponse>('images');
  }
}

export const dockerAPI = new DockerAPI('/api/docker');
