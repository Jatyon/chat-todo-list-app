import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthRest } from '@shared/auth/rest/auth.rest';

@Component({
  selector: 'app-active-account',
  templateUrl: './active-account.component.html',
  styleUrls: ['./active-account.component.scss'],
})
export class ActiveAccountComponent {
  constructor(private authRest: AuthRest, private router: Router, private route: ActivatedRoute) {}

  token: string | null = '';

  ngOnInit() {
    this.token = this.route.snapshot.paramMap.get('token');

    if (this.token) {
      this.authRest.activeAccount(this.token).subscribe((data) => {
        if (data) this.router.navigate(['/auth/login'], { state: { message: 'Konto zostało aktywowane!' } });
      }); // TODO: moze trzeba bedzie dac ze info ze konto aktywne i bad jak cos nie tak
    }
    this.router.navigate(['/auth/login']);
  }
}
