import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ErrorInfoModule } from '@core/modules/error-info/error-info.module';
import { BoardShareComponent } from '@modules/board-share/board-share.component';
import { ChatModule } from '@modules/chat/chat.module';
import { ErrorInfoComponent } from '@core/modules/error-info/error-info.component';
@NgModule({
  declarations: [BoardShareComponent],
  imports: [CommonModule, FormsModule, ChatModule, ErrorInfoModule],
  providers:[ErrorInfoComponent]
})
export class BoardShareModule {}
