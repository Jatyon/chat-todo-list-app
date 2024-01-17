import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/login/login.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { MainComponent } from './core/modules/main/main/main.component';
import { AuthGuard } from './modules/auth/auth.guard';
import { IsLoggedGuard } from './modules/auth/is-logged.guard';
import { ActivationLinkComponent } from './modules/auth/activation-link/activation-link.component';

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
    path: 'auth/activation-link',
    component: ActivationLinkComponent,
    canActivate: [IsLoggedGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
