import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

const ACCESS_TOKEN = 'auth-token';
const REFRESH_TOKEN = 'auth-refresh';
const USER = 'user';

@Injectable()
export class AuthService {
  constructor(private router: Router) {}

  isAuthenticated(): boolean {
    const accessToken: string | null = this.getAccessToken();
    const refreshToken: string | null = this.getRefreshToken();
    const user: string | null = this.getUser();
    if (accessToken && refreshToken && user) return true;
    return false;
  }

  getUser(): string | null {
    const email: string | null = localStorage.getItem(USER);
    if (email) return email;
    return null;
  }

  setUser(email: string): void {
    localStorage.setItem(USER, email);
  }

  getAccessToken(): string | null {
    const token: string | null = localStorage.getItem(ACCESS_TOKEN);
    if (token) return token;
    return null;
  }

  setAccessToken(token: string): void {
    localStorage.setItem(ACCESS_TOKEN, token);
  }

  getRefreshToken(): string | null {
    const token: string | null = localStorage.getItem(REFRESH_TOKEN);
    if (token) return token;
    return null;
  }

  setRefreshToken(token: string): void {
    localStorage.setItem(REFRESH_TOKEN, token);
  }

  logout(): void {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    localStorage.removeItem(USER);
    this.router.navigate(['/auth/login']);
  }
}
