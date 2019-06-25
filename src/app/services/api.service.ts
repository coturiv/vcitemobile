import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


export class HttpOptions {
  headers: HttpHeaders | {
    [header: string]: string | string[]
  };

  private _params: HttpParams | {
    [param: string]: string | string[]
  };

  constructor(
    headers: HttpHeaders = new HttpHeaders({ 'Accept': 'application/json', 'Content-Type': 'application/json' }),
    paramsObj: {[param: string]: any} = {}
  ) {
    this.headers = headers;
    this.params = paramsObj;
  }

  get params() {
    return this._params;
  }

  set params(paramsObj: {[param: string]: any} | HttpParams) {

    if (paramsObj instanceof HttpParams) {
      this._params = paramsObj;
    } else {
      this._params = new HttpParams();

      for (const p of Object.keys(paramsObj)) {
        this._params = this._params.set(p, paramsObj[p]);
      }
    }
  }
}

export interface ApiResponse<T> {
  data: T;
  status: {
    success: boolean;
    reason: string;
    message: string;
  };
}


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  readonly apiUrl: string = environment.apiUrl;

  constructor(public httpClient: HttpClient) {}

  get<T>(endPoint: string, options: HttpOptions = new HttpOptions()): Observable<T> {
    return this.httpClient.get<T>(`${this.apiUrl}/${endPoint}`, options);
  }

  put<T>(endPoint: string, body: any, options: HttpOptions = new HttpOptions()): Observable<T | any> {
    return this.httpClient.put(`${this.apiUrl}/${endPoint}`, body, options);
  }

  post<T>(endPoint: string, body: any, options: HttpOptions = new HttpOptions()): Observable<T | any> {
    return this.httpClient.post(`${this.apiUrl}/${endPoint}`, body, options);
  }
}
