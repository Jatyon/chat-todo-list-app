import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskComponent } from '@modules/board/components/task/task.component';
import { BoardComponent } from '@modules/board/components/board/board.component';

@NgModule({
  declarations: [BoardComponent, TaskComponent],
  imports: [CommonModule, FormsModule],
})
export class BoardModule {}
