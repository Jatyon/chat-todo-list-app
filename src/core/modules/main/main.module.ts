import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthInterceptor1 } from '@core/interceptors/auth-interceptor';
import { MainComponent } from '@core/modules/main/main/main.component';
import { TodoComponent } from '@core/modules/main/todo/todo.component';
import { ChatComponent } from '@core/modules/main/chat/chat.component';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  declarations: [TodoComponent, ChatComponent, MainComponent],
  imports: [CommonModule, HttpClientModule, QRCodeModule, FormsModule],
  providers: [
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AuthInterceptor,
    //   multi: true,
    // },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor1,
      multi: true,
    },
  ],
})
export class MainModule {}
