import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthRest } from '@shared/auth/rest/auth.rest';
import { AuthService } from '@shared/auth/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private authRest: AuthRest,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
  ) {
    const navigationState = window.history.state;
    if (navigationState && navigationState.message) {
      this.activationMessage = navigationState.message;
    }
  }

  loginForm!: FormGroup;
  step: number = 1;
  email: string = '';
  password: string = '';
  twoFactorCode: string = '';
  loginErrorStep1: boolean = false;
  loginErrorStep2: boolean = false;
  activationMessage: string = '';

  profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
  });

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });

    // this.loginForm = this.fb.group({
    //   email: ['', [Validators.required, Validators.email]],
    //   password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)]]
    // });
  }

  login() {
    console.log(this.loginForm);
    // this.authRest.login(this.email, this.password).subscribe((data) => {
    //   if (data) {
    //     if (data.access_token) {
    //       const { access_token, refresh_token } = data;

    //       this.authService.setAccessToken(access_token);
    //       this.authService.setRefreshToken(refresh_token);
    //       this.authService.setUser(this.email);
    //       this.loginErrorStep1 = false; //TODO: moze nie byc
    //       this.router.navigate(['/']);
    //     } else this.step = 2;
    //   } else this.loginErrorStep1 = true;
    // });
  }

  submitTwoFactorCode(): void {
    this.authRest.verifyTwoFactorAuth(this.email, this.twoFactorCode).subscribe((data) => {
      if (data) {
        const { access_token, refresh_token } = data;

        this.loginErrorStep2 = false; //TODO: moze nie byc
        this.authService.setAccessToken(access_token);
        this.authService.setRefreshToken(refresh_token);
        this.authService.setUser(this.email);
        this.router.navigate(['/']);
      } else this.loginErrorStep2 = true;
    });
  }
}
