type AppsResponse = string[];

export class DokkuAPI {
  constructor(private readonly basePath: string) {}

  private makeRequest<T>(url: string): Promise<T> {
    return fetch(`${this.basePath}/${url}`).then((response) => response.json());
  }

  getApps(): Promise<AppsResponse> {
    return this.makeRequest<AppsResponse>('apps');
  }
}

export const dokkuApi = new DokkuAPI('/api/dokku');
