import { Component, Input } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-two-fa',
  templateUrl: './two-fa.component.html',
  styleUrls: ['./two-fa.component.scss'],
})
export class TwoFaComponent {
  constructor(private authService: AuthService, private router: Router) {}

  twoFactorCode: string = '';
  @Input() email: string = '';

  submitTwoFactorCode(): void {
    this.authService.verifyTwoFactorAuth(this.email, this.twoFactorCode).subscribe((data) => {
      if (data) {
        const { access_token, refresh_token } = data;

        const token: string = JSON.stringify({ access_token, refresh_token });

        localStorage.setItem('token', token);
        this.router.navigate(['/']);
      } else {
      }
    });
  }
}
