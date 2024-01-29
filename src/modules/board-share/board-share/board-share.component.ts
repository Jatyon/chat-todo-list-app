import { Component } from '@angular/core';
import { Task } from '@modules/board/models/task.model';
import { Socket, io } from 'socket.io-client';

@Component({
  selector: 'app-board-share',
  templateUrl: './board-share.component.html',
  styleUrls: ['./board-share.component.scss'],
})
export class BoardShareComponent {
  private socket: any;
  tasks: Task[] = [];
  addTask: Pick<Task, 'title' | 'category' | 'description' | 'done'> = { title: '', category: '', description: '', done: false };

  ngOnInit() {
    this.socket = io('http://localhost:3112', {
      extraHeaders: {
        Authorization:
          'Bearer ' +
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNvc0B3cC5wbCIsImlhdCI6MTcwNjEwNDE1MywiZXhwIjoxNzA2MTE0MTUzfQ._PiETtKuW3oSKuQtUIbUk7a0Ecc1CBeuBoo_2jhQuH8',
      },
    });

    // this.socket.on('connect', () => {
    //   console.log('Connected to WebSocket');
    // });
    this.socket.emit('board:join', 'token');

    this.socket.on('board:load:tasks', (tasks: Task[]) => {
      console.log(tasks);
      console.log('Connected to WebSocket');
      this.tasks = tasks;
    });
    // const data = 'asdas';
    //
  }

  submitTask() {}
}
