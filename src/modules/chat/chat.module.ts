import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatComponent } from '@modules/chat/chat.component';

@NgModule({
  declarations: [ChatComponent],
  imports: [CommonModule, FormsModule],
  providers: [],
  exports: [ChatComponent],
})
export class ChatModule {}
