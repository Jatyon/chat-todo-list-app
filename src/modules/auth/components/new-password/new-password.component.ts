import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthRest } from '@shared/auth/rest/auth.rest';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss'],
})
export class NewPasswordComponent {
  constructor(private authRest: AuthRest, private router: Router, private route: ActivatedRoute) {}

  token: string | null = '';
  password: string = '';
  secondPassword: string = '';

  sendNewPassword() {
    this.token = this.route.snapshot.paramMap.get('token');

    if (this.token) {
      this.authRest.newPassword(this.token, this.password, this.secondPassword).subscribe((data) => {
        if (data) this.router.navigate(['/auth/login'], { state: { message: 'Hało zostało zmienione!' } });
      }); // TODO: moze trzeba bedzie dac ze info ze konto aktywne i bad jak cos nie tak
    }
    this.router.navigate(['/auth/login']);
  }
}
