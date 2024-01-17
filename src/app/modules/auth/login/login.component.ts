import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}

  username: string = '';
  password: string = '';
  loginError: boolean = false;
  showTwoFaModal: boolean = false;

  login() {
    this.authService.login(this.username, this.password).subscribe((data) => {
      if (data) {
        if (data.access_token) {
          const { access_token, refresh_token } = data;

          const token: string = JSON.stringify({ access_token, refresh_token });

          localStorage.setItem('token', token);
          this.loginError = false;
          this.router.navigate(['/']);
        } else {
          this.showTwoFaModal = true;
        }
      } else {
        // Logowanie nieudane
        this.loginError = true;
      }
    });
  }

  onTwoFactorCodeEntered(code: string): void {
    // Tutaj możesz przekazać kod autoryzacyjny do usługi AuthService do weryfikacji
    console.log('Wprowadzono kod autoryzacyjny:', code);
  }
}
