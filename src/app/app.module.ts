import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';
import { MainModule } from '@core/modules/main/main.module';
import { ErrorInfoModule } from '@core/modules/error-info/error-info.module';
import { AuthSharedModule } from '@shared/auth/auth-shared.module';
import { AuthModule } from '@modules/auth/auth.module';
import { BoardShareModule } from '@modules/board-share/board-share.module';
import { BoardModule } from '@modules/board/board.module';
import { ChatModule } from '@modules/chat/chat.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    AuthSharedModule,
    MainModule,
    BoardModule,
    BoardShareModule,
    ChatModule,
    ErrorInfoModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
