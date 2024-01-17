import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { BasicInterceptor } from '../../core/interceptors/basic-interceptor';
import { TwoFaComponent } from './two-fa/two-fa.component';
import { ActivationLinkComponent } from './activation-link/activation-link.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, TwoFaComponent, ActivationLinkComponent],
  imports: [CommonModule, FormsModule, HttpClientModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BasicInterceptor,
      multi: true,
    },
  ],
})
export class AuthModule {}
