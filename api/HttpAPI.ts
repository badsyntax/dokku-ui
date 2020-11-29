export class HttpAPI {
  constructor(private readonly basePath: string) {}

  protected makeRequest<T>(
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

  protected getJson<T>(url: string): Promise<T> {
    return this.makeRequest<T>(url, 'application/json');
  }
}
