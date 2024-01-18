import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from '@core/modules/main/main/main.component';
import { AuthGuard } from '@shared/auth/guards/auth.guard';
import { IsLoggedGuard } from '@shared/auth/guards/is-logged.guard';
import { LoginComponent } from '@modules/auth/components/login/login.component';
import { RegisterComponent } from '@modules/auth/components/register/register.component';
import { ActiveAccountComponent } from '@modules/auth/components/active-account/active-account.component';
import { ForgotPasswordComponent } from '@modules/auth/components/forgot-password/forgot-password.component';
import { NewPasswordComponent } from '@modules/auth/components/new-password/new-password.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
  },
  { path: 'auth/login', component: LoginComponent, canActivate: [IsLoggedGuard] },
  {
    path: 'auth/register',
    component: RegisterComponent,
    canActivate: [IsLoggedGuard],
  },
  {
    path: 'auth/active-account/:token',
    component: ActiveAccountComponent,
    canActivate: [IsLoggedGuard],
  },
  {
    path: 'auth/forgot-password',
    component: ForgotPasswordComponent,
    canActivate: [IsLoggedGuard],
  },
  {
    path: 'auth/new-password/:token',
    component: NewPasswordComponent,
    canActivate: [IsLoggedGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
