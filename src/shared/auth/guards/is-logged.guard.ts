import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@shared/auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class IsLoggedGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (!this.authService.isAuthenticated()) return true;

    this.router.navigate(['']);
    return false;
  }
}
