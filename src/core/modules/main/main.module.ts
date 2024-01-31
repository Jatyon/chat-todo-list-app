import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthInterceptor } from '@core/interceptors/auth-interceptor';
import { MainComponent } from '@core/modules/main/main/main.component';
import { MainRest } from '@core/modules/rest/main.rest';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  declarations: [MainComponent],
  imports: [CommonModule, HttpClientModule, QRCodeModule, FormsModule],
  providers: [
    MainRest,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
})
export class MainModule {}
