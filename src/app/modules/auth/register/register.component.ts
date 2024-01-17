import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(private authService: AuthService, private router: Router) {}

  email: string = '';
  password: string = '';
  secondPassword: string = '';
  is2Fa: boolean = false;

  register() {
    console.log(this.email);
    console.log(this.password);

    this.authService.register(this.email, this.password, this.secondPassword, this.is2Fa).subscribe((data) => {
      if (data) {
        if (typeof data.message === 'string') {
          this.router.navigate(['/auth/activation-link']);
        } else {
          // this.showTwoFaModal = true;
        }
      } else {
        // Logowanie nieudane
        // this.loginError = true;
      }
    });
  }
}
