import { App } from '../dokku/types';
import { HttpAPI } from './HttpAPI';

export type AppsResponse = string[];
export type AppResponse = App;

export class DokkuAPI extends HttpAPI {
  getApps(): Promise<AppsResponse> {
    return this.getJson<AppsResponse>('apps');
  }

  getApp(appName: string): Promise<AppResponse> {
    return this.getJson<AppResponse>(`apps/${appName}`);
  }
}

export const dokkuApi = new DokkuAPI('/api/dokku');
