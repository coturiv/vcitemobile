import { Injectable } from '@angular/core';
import { HttpErrorResponse,
         HttpHandler,
         HttpEvent,
         HttpRequest,
         HttpInterceptor as BaseHttpInterceptor,
         HttpHeaders} from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { StorageKeys } from '../utility/constant';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptor implements BaseHttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      headers: new HttpHeaders({
        'DNS-NAME': localStorage.getItem(StorageKeys.CURRENT_DNS_NAME)
      })
    });
    return next.handle(request).pipe(
      catchError(err => {
        // console.log(err);

        // if (err.status == 200) {
        //   return of(err);
        // }
        return throwError(err);
      }));
  }
}
