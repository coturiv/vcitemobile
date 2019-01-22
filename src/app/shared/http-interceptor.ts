import { Injectable } from '@angular/core';
import { HttpErrorResponse, 
         HttpHandler, 
         HttpEvent, 
         HttpRequest, 
         HttpInterceptor as BaseHttpInterceptor } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptor implements BaseHttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(err => {
        console.log(err);

        if (err.status == 200) {
          return of(err);
        }
        return throwError(err);
      }));
  }
}