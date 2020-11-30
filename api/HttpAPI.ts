export class HttpAPI {
  constructor(private readonly basePath: string) {}

  protected makeRequest<ResponseType>(
    url: string,
    accept: 'application/json' | 'text/html',
    method = 'get'
  ): Promise<ResponseType> {
    return fetch(`${this.basePath}/${url}`, {
      method,
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

  protected getJson<ResponseType>(url: string): Promise<ResponseType> {
    return this.makeRequest<ResponseType>(url, 'application/json');
  }
}
