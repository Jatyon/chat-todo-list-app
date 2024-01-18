import { Component } from '@angular/core';
import { AuthRest } from '@shared/auth/rest/auth.rest';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  constructor(private authRest: AuthRest) {}

  step: number = 1;
  email: string = '';
  forgotError: boolean = false;

  submitSendForgotPassword() {
    this.authRest.forgotPassword(this.email).subscribe((data) => {
      if (data) this.step = 2;
      else this.forgotError = true;
    });
  }
}
