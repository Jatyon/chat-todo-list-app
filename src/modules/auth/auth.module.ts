import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '@modules/auth/components/login/login.component';
import { RegisterComponent } from '@modules/auth/components/register/register.component';
import { AuthRest } from '@shared/auth/rest/auth.rest';
import { FormsModule } from '@angular/forms';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { NewPasswordComponent } from './components/new-password/new-password.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, ForgotPasswordComponent, NewPasswordComponent],
  imports: [CommonModule, FormsModule],
  providers: [AuthRest],
})
export class AuthModule {}
