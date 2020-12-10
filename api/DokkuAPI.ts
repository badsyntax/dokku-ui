import { App } from '../dokku/types';
import { HttpAPI } from './HttpAPI';

export class DokkuAPI extends HttpAPI {
  getApps(): Promise<string[]> {
    return this.getJson<string[]>('apps');
  }

  getApp(app: string): Promise<App> {
    return this.getJson<App>(`apps/${app}`);
  }

  createApp(app: string): Promise<App> {
    return this.put<App>(`apps/${app}`, new FormData());
  }

  addAppConfig(app: string, data: FormData): Promise<string> {
    return this.put<string>(`apps/${app}/config`, data);
  }

  deployApp(app: string, data: FormData): Promise<string> {
    return this.put<string>(`apps/${app}/deploy`, data);
  }
}

export const dokkuApi = new DokkuAPI('/api/dokku');
