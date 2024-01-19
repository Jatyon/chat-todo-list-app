import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Token } from '@core/models/token.model';
import { AuthRest } from '@shared/auth/rest/auth.rest';
import { AuthService } from '@shared/auth/services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  constructor(private authService: AuthService, private authRest: AuthRest, private router: Router) {}

  token: string | null = this.authService.getAccessToken();
  email: string | null = this.authService.getUser();
  isTwoFa: boolean = true;
  step: number = 0;
  secret: string = '';
  otpauthUrl: string = '';
  qrCode: string = '';
  twoFactorCode: string = '';

  ngOnInit() {
    if (!this.token || !this.email) this.router.navigate(['/auth/login']);

    this.authRest.getUserDetails(this.email as string).subscribe((data) => {
      if (data) {
        const { email, lastLoggedAt, is2fa } = data;
        // if (!lastLoggedAt && !is2fa) this.isTwoFa = false;
        this.isTwoFa = false;
        console.log(data);
      }
    });
  }

  cancelModal() {
    this.isTwoFa = true;
  }

  submitToken() {
    this.step = 2;
  }

  submitTwoFactor() {
    this.isTwoFa = true;
    this.step = 1;

    this.authRest.getTwoFaCode().subscribe((data) => {
      if (data) {
        const { otpauth_url, qr_code, secret } = data;
        this.secret = secret;
        this.otpauthUrl = otpauth_url;
        this.qrCode = `data:image/png;base64,${qr_code}`;
        // if (!lastLoggedAt && !is2fa) this.isTwoFa = false;
        console.log(data);
      }
    });
  }

  submitCode() {
    this.authRest.setTwoFactorAuth(this.email as string, this.twoFactorCode).subscribe((data) => {
      if (data) {
        this.step = 0;
        // if (!lastLoggedAt && !is2fa) this.isTwoFa = false;
        console.log(data);
      }
    });
  }
}
