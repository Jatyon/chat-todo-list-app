import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Token } from 'src/app/core/models/token.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const loginUser: { username: string; password: string } = { username, password };
    return this.http.post('/auth/login', loginUser);
  }

  register(email: string, password: string, secondPassword: string, is2Fa: boolean): Observable<any> {
    const registerUser: { email: string; password: string; secondPassword: string; is2Fa: boolean } = {
      email,
      password,
      secondPassword,
      is2Fa,
    };
    return this.http.post('/user', registerUser);
  }

  isAuthenticated(): boolean {
    const token: string | null = localStorage.getItem('token');
    if (token) return true;
    return false;
  }

  getToken(): Token | null {
    const token: string | null = localStorage.getItem('token');
    if (token) return JSON.parse(token);
    return null;
  }

  verifyTwoFactorAuth(email: string, token: string): Observable<any> {
    const twoFaData: { email: string; token: string } = { email, token };
    return this.http.post('/auth/two-factor-auth/verify', twoFaData);
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}
