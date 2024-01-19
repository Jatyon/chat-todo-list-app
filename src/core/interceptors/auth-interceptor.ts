// import { Injectable } from '@angular/core';
// import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
// import { AuthService } from '@shared/auth/services/auth.service';
// import { Observable } from 'rxjs';

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//   constructor(private authService: AuthService) {}

//   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     const apiUrl: string = 'http://localhost:3112';
//     let apiReq: HttpRequest<any> = request.clone({
//       url: `${apiUrl}${request.url}`,
//     });

//     const token: string | null = this.authService.getAccessToken();
//     if (token) {
//       const headers: HttpHeaders = new HttpHeaders({
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json',
//         Accept: 'application/json',
//       });

//       apiReq = apiReq.clone({ headers: headers });
//     }
//     console.log(apiReq);
//     return next.handle(apiReq);
//   }
// }
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from '@shared/auth/services/auth.service';

@Injectable()
export class AuthInterceptor1 implements HttpInterceptor {
  static accessToken = '';
  refresh = false;

  constructor(private authService: AuthService, private http: HttpClient) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const accessToken: string | null = this.authService.getAccessToken();

    if (accessToken) AuthInterceptor1.accessToken = accessToken;

    const req = request.clone({
      setHeaders: {
        Authorization: `Bearer ${AuthInterceptor1.accessToken}`,
      },
    });

    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401 && !this.refresh) {
          this.refresh = true;
          const refreshToken: string | null = this.authService.getRefreshToken();

          if (refreshToken) {
            return this.http.post('http://localhost:3112/auth/refresh', { refresh: refreshToken }, { withCredentials: true }).pipe(
              switchMap((res: any) => {
                AuthInterceptor1.accessToken = res.token;

                return next.handle(
                  request.clone({
                    setHeaders: {
                      Authorization: `Bearer ${AuthInterceptor1.accessToken}`,
                    },
                  }),
                );
              }),
            );
          }
        }
        this.refresh = false;
        return throwError(() => err);
      }),
    );
  }
}
