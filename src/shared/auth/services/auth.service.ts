import { Injectable } from '@angular/core';
import { AuthRest } from '@shared/auth/rest/auth.rest';
import { BehaviorSubject, Observable, throwError, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable()
export class AuthService {
  constructor(private authRest: AuthRest) {
    this.accessTokenSubject = new BehaviorSubject<string | null>(this.getAccessToken());
    this.accessToken = this.accessTokenSubject.asObservable();
  }

  private accessTokenSubject: BehaviorSubject<string | null>;
  public accessToken: Observable<string | null>;

  isAuthenticated(): boolean {
    const accessToken: string | null = this.getAccessToken();
    const refreshToken: string | null = this.getRefreshToken();
    if (accessToken && refreshToken) return true;
    return false;
  }

  getUser(): string | null {
    const email: string | null = localStorage.getItem('user');
    if (email) return email;
    return null;
  }

  setUser(email: string): void {
    localStorage.setItem('user', email);
  }

  getAccessToken(): string | null {
    const token: string | null = localStorage.getItem('auth-token');
    if (token) return token;
    return null;
  }

  setAccessToken(token: string): void {
    localStorage.setItem('auth-token', token);
  }

  getRefreshToken(): string | null {
    const token: string | null = localStorage.getItem('auth-refresh');
    if (token) return token;
    return null;
  }

  setRefreshToken(token: string): void {
    localStorage.setItem('auth-refresh', token);
  }

  refreshToken(): Observable<any> {
    const refreshToken: string | null = this.getRefreshToken();
    // Wyslij żądanie odświeżenia tokena do serwera
    // Ustaw nowy accessToken po odebraniu nowego tokenu
    // Zwróć Observable z nowym accessToken

    // return this.authRest.getNewToken(refreshToken).subscribe((data) => {
    //   if (data) {
    //     const { access_token, refresh_token } = data;
    //     const token: string = JSON.stringify({ access_token, refresh_token });

    //     this.loginErrorStep2 = false; //TODO: moze nie byc
    //     localStorage.setItem('token', token);
    //     localStorage.setItem('user', this.email);
    //     this.router.navigate(['/']);
    //   } else this.loginErrorStep2 = true;
    // });

    if (!refreshToken) {
      // Jeśli nie ma refreshToken, zwróć błąd
      return throwError('No refresh token available');
    }

    return this.authRest.getNewToken(refreshToken).pipe(
      switchMap((response) => {
        // Zakładamy, że serwer zwraca nowy accessToken w odpowiedzi
        const newAccessToken = response.access_token;

        if (newAccessToken) {
          // Ustaw nowy accessToken
          this.setAccessToken(newAccessToken);
          return of(newAccessToken);
        } else {
          // Jeśli serwer nie zwrócił nowego accessTokena, zwróć błąd
          return throwError('Refresh token failed');
        }
      }),
      catchError((error) => {
        // Obsługa błędów podczas odświeżania tokena
        return throwError('Refresh token failed');
      }),
    );
  }

  logout(): void {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('auth-refresh');
    localStorage.removeItem('user');
  }
}
