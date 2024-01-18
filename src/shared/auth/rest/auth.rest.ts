import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthRest {
  constructor(private readonly httpClient: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const loginUser: { username: string; password: string } = { username, password };
    return this.httpClient.post('/auth/login', loginUser);
  }

  register(email: string, password: string, secondPassword: string): Observable<any> {
    const registerUser: { email: string; password: string; secondPassword: string } = {
      email,
      password,
      secondPassword,
    };
    return this.httpClient.post('/user', registerUser);
  }

  verifyTwoFactorAuth(email: string, token: string): Observable<any> {
    const twoFaData: { email: string; token: string } = { email, token };
    return this.httpClient.post('/auth/two-factor-auth/verify', twoFaData);
  }

  activeAccount(token: string): Observable<any> {
    return this.httpClient.get(`/user/active-account/${token}`);
  }

  forgotPassword(email: string): Observable<any> {
    return this.httpClient.post('/user/forgot-password', { email });
  }

  newPassword(token: string, password: string, secondPassword: string): Observable<any> {
    const passwordData: { token: string; password: string; secondPassword: string } = { token, password, secondPassword };
    return this.httpClient.post('/user/new-password', passwordData);
  }
}
