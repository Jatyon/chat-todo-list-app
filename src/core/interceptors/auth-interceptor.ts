import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { environment } from '@env/environment';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from '@shared/auth/services/auth.service';
import { AuthRest } from '../../shared/auth/rest/auth.rest';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authRest: AuthRest, private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken: string | null = this.authService.getAccessToken();

    request = this.addToken(request, accessToken as string);

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.url === `${environment.host}/${environment.refreshToken}`) this.authService.logout();

        if (err.status === 401) {
          const refreshToken: string | null = this.authService.getRefreshToken();

          if (refreshToken) {
            return this.authRest.getNewToken(refreshToken).pipe(
              switchMap((res: any) => {
                if (res) {
                  this.authService.setAccessToken(res.access_token);
                  request = this.addToken(request.clone(), res.access_token);
                  return next.handle(request);
                }
                return throwError(() => new Error('Token refresh error'));
              }),
            );
          }
        }
        return throwError(() => new Error('Token refresh error'));
      }),
    );
  }

  private addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
