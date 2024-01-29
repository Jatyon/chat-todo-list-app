import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BoardShareComponent } from '@modules/board-share/board-share/board-share.component';
import { AuthInterceptor } from '@core/interceptors/auth-interceptor';

@NgModule({
  declarations: [BoardShareComponent],
  imports: [CommonModule, FormsModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
})
export class BoardShareModule {}
