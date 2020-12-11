import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        let error = '';
        if (err.status === 500) {
          this.router.navigateByUrl('/error');
          error = err.error;
          return throwError(error);
        } else if (err.status === 401 && (err.error === null || err.error === undefined)) {
          this.router.navigateByUrl('/login');
        } else {
          error = err.error.statusCode;
          return throwError(error);
        }
      })
    );
  }
}
