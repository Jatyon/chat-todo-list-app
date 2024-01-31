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
import { BoardComponent } from '@modules/board/components/board/board.component';
import { BoardShareComponent } from '@modules/board-share/board-share.component';

const routes: Routes = [
  // { path: '', redirectTo: '', pathMatch: 'full' },
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Home',
    },
    children: [
      {
        path: '',
        loadChildren: () => import('@core/modules/main/main.module').then((m) => m.MainModule),
      },
      // {
      //   path: 'board',
      //   loadChildren: () => import('@modules/board/board.module').then((m) => m.BoardModule),
      // },
    ],
  },
  { path: 'board/:id', component: BoardComponent, canActivate: [AuthGuard] },
  { path: 'board/share/:id', component: BoardShareComponent, canActivate: [AuthGuard] },

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
