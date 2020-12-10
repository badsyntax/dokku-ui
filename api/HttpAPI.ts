export class HttpAPI {
  constructor(private readonly basePath: string) {}

  protected makeRequest<ResponseType>(
    url: string,
    opts: RequestInit
  ): Promise<ResponseType> {
    return fetch(`${this.basePath}/${url}`, opts).then((response) => {
      return response.json().then((json) => {
        if (!response.ok || !json.ok) {
          throw new Error(json.message);
        }
        return json.data;
      });
    });
  }

  protected getJson<ResponseType>(url: string): Promise<ResponseType> {
    return this.makeRequest<ResponseType>(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });
  }

  protected put<ResponseType>(
    url: string,
    data: FormData
  ): Promise<ResponseType> {
    return this.makeRequest<ResponseType>(url, {
      method: 'PUT',
      body: new URLSearchParams(data as any).toString(),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
    });
  }
}
