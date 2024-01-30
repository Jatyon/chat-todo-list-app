import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '@env/environment';
import { Task } from '@modules/board/models/task.model';
import { AuthService } from '@shared/auth/services/auth.service';
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

  constructor(private authService: AuthService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.socket = io(environment.host, {
      extraHeaders: {
        Authorization: 'Bearer ' + this.authService.getAccessToken(),
      },
    });

    this.socket.on('connect', () => {
      const boardId: string | null = this.route.snapshot.paramMap.get('id');
      this.socket.emit('board:join', boardId);
    });

    this.socket.on('error', () => {
      this.authService.logout();
    });

    this.socket.on('board:load:tasks', (tasks: Task[]) => {
      this.tasks = tasks;
    });

    this.socket.on('board:send:task', (task: Task) => {
      this.tasks = [...this.tasks, task];
    });
  }

  submitTask() {
    console.log(this.addTask);
    this.socket.emit('board:add:task', this.addTask);
  }
}
