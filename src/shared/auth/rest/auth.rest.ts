import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable()
export class AuthRest {
  constructor(private readonly httpClient: HttpClient) {}

  path: string = environment.host;

  login(username: string, password: string): Observable<any> {
    const loginUser: { username: string; password: string } = { username, password };
    console.log(this.path);
    return this.httpClient.post(this.path + '/auth/login', loginUser);
  }

  getNewToken(refresh: string): Observable<any> {
    return this.httpClient.post<any>(this.path + '/auth/refresh', { refresh });
  }

  register(email: string, password: string, secondPassword: string): Observable<any> {
    const registerUser: { email: string; password: string; secondPassword: string } = {
      email,
      password,
      secondPassword,
    };
    return this.httpClient.post(this.path + '/user', registerUser);
  }

  getTwoFaCode(): Observable<any> {
    return this.httpClient.post(this.path + '/auth/two-factor-auth/enable', {});
  }

  verifyTwoFactorAuth(email: string, token: string): Observable<any> {
    const twoFaData: { email: string; token: string } = { email, token };
    return this.httpClient.post(this.path + '/auth/two-factor-auth/verify', twoFaData);
  }

  setTwoFactorAuth(email: string, token: string): Observable<any> {
    const twoFaData: { email: string; token: string } = { email, token };
    return this.httpClient.post(this.path + '/auth/set/two-factor-auth', twoFaData);
  }

  activeAccount(token: string): Observable<any> {
    return this.httpClient.get(`/user/active-account/${token}`);
  }

  forgotPassword(email: string): Observable<any> {
    return this.httpClient.post(this.path + '/user/forgot-password', { email });
  }

  newPassword(token: string, password: string, secondPassword: string): Observable<any> {
    const passwordData: { token: string; password: string; secondPassword: string } = { token, password, secondPassword };
    return this.httpClient.post(this.path + '/user/new-password', passwordData);
  }

  getUserDetails(email: string): Observable<any> {
    return this.httpClient.post(this.path + '/user/get', { email });
  }
}
