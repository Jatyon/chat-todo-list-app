import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { AuthService } from '@shared/auth/services/auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const apiUrl: string = 'http://localhost:3112';
    let apiReq: HttpRequest<any> = request.clone({
      url: `${apiUrl}${request.url}`,
    });

    const token = this.authService.getToken();
    if (token) {
      const headers: HttpHeaders = new HttpHeaders({
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      });

      apiReq = apiReq.clone({ headers: headers });
    }

    return next.handle(apiReq);
  }
}
