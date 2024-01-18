import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthRest } from '@shared/auth/rest/auth.rest';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private authRest: AuthRest, private router: Router, private route: ActivatedRoute) {
    const navigationState = window.history.state;
    if (navigationState && navigationState.message) {
      this.activationMessage = navigationState.message;
    }
  }

  step: number = 1;
  email: string = '';
  password: string = '';
  twoFactorCode: string = '';
  loginErrorStep1: boolean = false;
  loginErrorStep2: boolean = false;
  activationMessage: string = '';

  login() {
    this.authRest.login(this.email, this.password).subscribe((data) => {
      if (data) {
        if (data.access_token) {
          const { access_token, refresh_token } = data;
          const token: string = JSON.stringify({ access_token, refresh_token });

          localStorage.setItem('token', token);
          this.loginErrorStep1 = false; //TODO: moze nie byc
          this.router.navigate(['/']);
        } else this.step = 2;
      } else this.loginErrorStep1 = true;
    });
  }

  submitTwoFactorCode(): void {
    this.authRest.verifyTwoFactorAuth(this.email, this.twoFactorCode).subscribe((data) => {
      if (data) {
        const { access_token, refresh_token } = data;
        const token: string = JSON.stringify({ access_token, refresh_token });

        this.loginErrorStep2 = false; //TODO: moze nie byc
        localStorage.setItem('token', token);
        this.router.navigate(['/']);
      } else this.loginErrorStep2 = true;
    });
  }
}
