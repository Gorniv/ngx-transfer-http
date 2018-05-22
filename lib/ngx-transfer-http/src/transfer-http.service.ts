import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { TransferState } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

@Injectable()
export class TransferHttpService {
  constructor(
    protected transferState: TransferState,
    private httpClient: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {

  }

  public request(method: string, uri: string | Request, options?: {
    body?: any;
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    reportProgress?: boolean;
    observe?: 'response';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<any> {
    // tslint:disable-next-line:no-shadowed-variable
    return this.getData(method, uri, options, (method: string, url: string, options: any) => {
      return this.httpClient.request(method, url, options);
    });
  }

  /**
   * Performs a request with `get` http method.
   */
  get(url: string, options?: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe?: 'response';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<any> {
    // tslint:disable-next-line:no-shadowed-variable
    return this.getData('get', url, options, (method: string, url: string, options: any) => {
      return this.httpClient.get(url, options);
    });
  }

  /**
   * Performs a request with `post` http method.
   */
  post(url: string, body: any, options?: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe?: 'response';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<any> {
    // tslint:disable-next-line:no-shadowed-variable
    return this.getPostData('post', url, body, options, (url: string, body: any, options: any): Observable<any> => {
      return this.httpClient.post(url, body, options);
    });
  }

  /**
   * Performs a request with `put` http method.
   */
  put(url: string, body: any, options?: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe?: 'body';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<any> {
    // tslint:disable-next-line:no-shadowed-variable
    return this.getData('put', url, options, (method: string, url: string, options: any) => {
      return this.httpClient.put(url, options);
    });
  }


  /**
   * Performs a request with `delete` http method.
   */
  delete(url: string, options?: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe?: 'response';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<any> {
    // tslint:disable-next-line:no-shadowed-variable
    return this.getData('delete', url, options, (method: string, url: string, options: any) => {
      return this.httpClient.delete(url, options);
    });
  }

  /**
   * Performs a request with `patch` http method.
   */
  patch(url: string, body: any, options?: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe?: 'response';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<any> {
    // tslint:disable-next-line:no-shadowed-variable
    return this.getPostData('patch', url, body, options, (url: string, body: any, options: any): Observable<any> => {
      return this.httpClient.patch(url, body, options);
    });
  }

  /**
   * Performs a request with `head` http method.
   */
  head(url: string, options?: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe?: 'response';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<any> {
    // tslint:disable-next-line:no-shadowed-variable
    return this.getData('head', url, options, (method: string, url: string, options: any) => {
      return this.httpClient.head(url, options);
    });
  }

  /**
   * Performs a request with `options` http method.
   */
  options(url: string, options?: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe?: 'response';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<any> {
    // tslint:disable-next-line:no-shadowed-variable
    return this.getData('options', url, options, (method: string, url: string, options: any) => {
      return this.httpClient.options(url, options);
    });
  }

  // tslint:disable-next-line:max-line-length
  private getData(method: string,
    uri: string | Request,
    options: any,
    callback: (method: string, uri: string | Request, options: any) => Observable<any>): any {

    let url = uri;

    if (typeof uri !== 'string') {
      url = uri.url;
    }

    const key = url + (options ? JSON.stringify(options) : '');

    try {
      return this.resolveData(key);
    } catch (e) {
      return callback(method, uri, options)
        .pipe(tap(data => {
          if (isPlatformBrowser(this.platformId)) {
            // Client only code.
            // nothing;
          }
          if (isPlatformServer(this.platformId)) {
            this.setCache(key, data);
          }
        }));
    }
  }

  // tslint:disable-next-line:max-line-length
  private getPostData(method: string,
    uri: string | Request,
    body: any, options: any,
    callback: (uri: string | Request, body: any, options: any) => Observable<Response>): any {

    let url = uri;

    if (typeof uri !== 'string') {
      url = uri.url;
    }

    const key = url + (body ? JSON.stringify(body) : '') + (options ? JSON.stringify(options) : '');

    try {
      return this.resolveData(key);
    } catch (e) {
      return callback(uri, body, options)
        .pipe(tap(data => {
          if (isPlatformBrowser(this.platformId)) {
            // Client only code.
            // nothing;
          }
          if (isPlatformServer(this.platformId)) {
            this.setCache(key, data);
          }
        }));
    }
  }

  private resolveData(key: any): any {
    const data = this.getFromCache(key);

    if (!data) {
      throw new Error();
    }

    if (isPlatformBrowser(this.platformId)) {
      // Client only code.
      this.transferState.remove(key);
    }
    if (isPlatformServer(this.platformId)) {
      // Server only code.
    }

    return fromPromise(Promise.resolve(data));
  }

  private setCache(key, data): any {
    return this.transferState.set(key, data);
  }

  private getFromCache(key): any {
    return this.transferState.get(key, null);
  }
}
