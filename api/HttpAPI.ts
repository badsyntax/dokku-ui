import { ResponseStatus } from './types';

export class HttpAPI {
  constructor(private readonly basePath: string) {}

  protected makeRequest<ResponseType>(
    url: string,
    opts: RequestInit
  ): Promise<ResponseType> {
    return fetch(`${this.basePath}/${url}`, {
      ...opts,
      headers: {
        Accept: 'application/json',
      },
    }).then((response) => {
      return response.json().then((json) => {
        if (!response.ok || json.status === ResponseStatus.error) {
          throw new Error(json.message);
        }
        return json.data;
      });
    });
  }

  protected getJson<ResponseType>(url: string): Promise<ResponseType> {
    return this.makeRequest<ResponseType>(url, {
      method: 'GET',
    });
  }

  protected put<ResponseType>(url: string): Promise<ResponseType> {
    return this.makeRequest<ResponseType>(url, {
      method: 'PUT',
    });
  }
}
