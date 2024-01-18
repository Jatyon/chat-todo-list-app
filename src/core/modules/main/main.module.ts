import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MainComponent } from '@core/modules/main/main/main.component';
import { TodoComponent } from '@core/modules/main/todo/todo.component';
import { ChatComponent } from '@core/modules/main/chat/chat.component';

@NgModule({
  declarations: [TodoComponent, ChatComponent, MainComponent],
  imports: [CommonModule, HttpClientModule],
})
export class MainModule {}
