import { Injectable } from '@angular/core';
import { Token } from '@core/models/token.model';

@Injectable()
export class AuthService {
  constructor() {}

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

  logout(): void {
    localStorage.removeItem('token');
  }
}
