import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BasicInterceptor } from '@core/interceptors/basic-interceptor';
import { AuthService } from '@shared/auth/services/auth.service';
import { AuthRest } from '@shared/auth/rest/auth.rest';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    AuthService,
    AuthRest,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: BasicInterceptor,
    //   multi: true,
    // },
  ],
})
export class AuthSharedModule {}
