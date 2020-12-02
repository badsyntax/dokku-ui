import { App } from '../dokku/types';
import { HttpAPI } from './HttpAPI';

export class DokkuAPI extends HttpAPI {
  getApps(): Promise<string[]> {
    return this.getJson<string[]>('apps');
  }

  getApp(app: string): Promise<App> {
    return this.getJson<App>(`apps/${app}`);
  }

  createApp(app: string): Promise<any> {
    return this.put<App>(`apps/${app}`);
  }
}

export const dokkuApi = new DokkuAPI('/api/dokku');
