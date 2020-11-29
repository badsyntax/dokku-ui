import { App } from '../dokku/types';

export type AppsResponse = string[];
export type AppResponse = App;

export class DokkuAPI {
  constructor(private readonly basePath: string) {}

  private makeRequest<T>(
    url: string,
    accept: 'application/json' | 'text/html'
  ): Promise<T> {
    return fetch(`${this.basePath}/${url}`, {
      headers: {
        Accept: accept,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        switch (accept) {
          case 'application/json':
            return response.json();
          case 'text/html':
            return response.text();
          default:
            return response;
        }
      })
      .catch((e) => {
        console.error(`HTTP Client Error: ${e.message}`);
        throw e;
      });
  }

  private getJson<T>(url: string) {
    return this.makeRequest<T>(url, 'application/json');
  }

  getApps(): Promise<AppsResponse> {
    return this.getJson<AppsResponse>('apps');
  }

  getApp(appName: string): Promise<AppResponse> {
    return this.getJson<AppResponse>(`apps/${appName}`);
  }
}

export const dokkuApi = new DokkuAPI('/api/dokku');
