import { ImageInfo } from 'dockerode';

export interface Images {
  dangling: ImageInfo[];
  nonDangling: ImageInfo[];
}
