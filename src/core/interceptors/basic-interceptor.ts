import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class BasicInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const apiUrl: string = 'http://localhost:3112';
    let apiReq: HttpRequest<any> = request.clone({
      url: `${apiUrl}${request.url}`,
    });

    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });

    apiReq = apiReq.clone({ headers: headers });

    return next.handle(apiReq);
  }
}
