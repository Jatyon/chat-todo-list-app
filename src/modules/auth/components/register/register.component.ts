import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthRest } from '@shared/auth/rest/auth.rest';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(private authRest: AuthRest, private router: Router) {}

  step: number = 1;
  email: string = '';
  password: string = '';
  repeatPassword: string = '';
  registerError: boolean = false;

  register() {
    console.log(this.email);
    console.log(this.password);

    this.authRest.register(this.email, this.password, this.repeatPassword).subscribe((data) => {
      if (data) this.step = 2;
      else this.registerError = true;
    });
  }
}
