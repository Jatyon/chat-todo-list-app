import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoComponent } from './todo/todo.component';
import { ChatComponent } from './chat/chat.component';
import { MainComponent } from './main/main.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [TodoComponent, ChatComponent, MainComponent],
  imports: [CommonModule, HttpClientModule],
})
export class MainModule {}
