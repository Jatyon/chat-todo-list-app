import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BoardShareComponent } from '@modules/board-share/board-share.component';
import { ChatModule } from '@modules/chat/chat.module';

@NgModule({
  declarations: [BoardShareComponent],
  imports: [CommonModule, FormsModule, ChatModule],
})
export class BoardShareModule {}
