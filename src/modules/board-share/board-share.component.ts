import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainRest } from '@core/modules/rest/main.rest';
import { environment } from '@env/environment';
import { Task } from '@modules/board/models/task.model';
import { AuthService } from '@shared/auth/services/auth.service';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-board-share',
  templateUrl: './board-share.component.html',
  styleUrls: ['./board-share.component.scss'],
})
export class BoardShareComponent {
  socket: any;
  token: string = '';
  email: string = '';
  tasks: Task[] = [];
  addTask: Pick<Task, 'title' | 'category' | 'description' | 'done'> = { title: '', category: '', description: '', done: false };

  showTaskDetails: boolean = false;
  taskDetails: Pick<Task, 'id' | 'title' | 'category' | 'description' | 'done'> = {
    id: 0,
    title: '',
    category: '',
    description: '',
    done: false,
  };
  showMembers: boolean = false;
  newMember: string = '';
  members: string[] = [];
  boardId: string = '';

  constructor(private mainRest: MainRest, private authService: AuthService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.socket = io(environment.host, {
      extraHeaders: {
        Authorization: 'Bearer ' + this.authService.getAccessToken(),
      },
    });

    this.socket.on('connect', () => {
      const boardId: string | null = this.route.snapshot.paramMap.get('id') as string;
      if (!boardId) this.authService.logout();
      this.boardId = boardId;
      const email = this.authService.getUser() as string;
      const data: {
        boardId: string | null;
        email: string;
      } = { boardId, email };
      console.log(data);
      this.socket.emit('board:join', data);
    });

    this.socket.on('error', () => {
      this.authService.logout();
    });

    this.socket.on('user:email', (email: string) => {
      this.email = email;
    });

    this.socket.on('board:token', (token: string) => {
      this.token = token;
    });

    this.socket.on('board:load:tasks', (tasks: Task[]) => {
      console.log(tasks);
      this.tasks = tasks;
    });

    this.socket.on('board:send:task', (task: Task) => {
      this.tasks = [...this.tasks, task];
    });

    this.socket.on('board:send:update:task', (updatedTask: Task) => {
      this.tasks = this.tasks.map((task) => {
        if (task.id === updatedTask.id)
          return {
            ...task,
            title: updatedTask.title,
            category: updatedTask.category,
            description: updatedTask.description,
            done: updatedTask.done,
          };
        return task;
      });
    });

    this.socket.on('board:send:done:task', (doneTask: Task) => {
      this.tasks = this.tasks.map((task) => {
        if (task.id === doneTask.id) return { ...task, done: true };
        return task;
      });
    });

    this.socket.on('board:send:remove:task', (id: number) => {
      this.tasks = this.tasks.filter((task) => task.id !== id);
    });
  }

  submitTask() {
    console.log(this.addTask);
    const data: {
      newTask: { title: string; category: string; description: string; done: boolean };
      token: string;
      email: string;
    } = { newTask: this.addTask, token: this.token, email: this.email };
    this.socket.emit('board:add:task', data);
  }

  showDetailsTask(id: number) {
    this.showTaskDetails = true;
    this.taskDetails = { ...(this.tasks.find((task) => task.id === id) as Task) };
  }

  hideDetailsTask(id: number) {
    const oldTask: Task = this.tasks.find((task) => task.id === id) as Task;
    if (!this.compareTask(oldTask)) {
      const data: {
        id: number;
        token: string;
        email: string;
        updateTask: { title: string; category: string; description: string; done: boolean };
      } = { id, token: this.token, email: this.email, updateTask: this.taskDetails };
      this.socket.emit('board:update:task', data);
    }
    this.showTaskDetails = false;
    this.taskDetails = { id: 0, title: '', category: '', description: '', done: false };
  }

  compareTask(task: Task): boolean {
    if (task.title !== this.taskDetails.title) return false;
    if (task.category !== this.taskDetails.category) return false;
    if (task.description !== this.taskDetails.description) return false;
    if (task.done !== this.taskDetails.done) return false;

    return true;
  }

  doneTask(id: number) {
    const data: {
      id: number;
      token: string;
      email: string;
    } = { id, token: this.token, email: this.email };
    this.socket.emit('board:done:task', data);
  }

  removeTask(id: number) {
    const data: {
      id: number;
      token: string;
    } = { id, token: this.token };
    this.socket.emit('board:remove:task', data);
  }

  showMember() {
    this.showMembers = true;

    this.mainRest.getMembers(+this.boardId).subscribe((members: { email: string }[]) => {
      this.members = members.map((member) => member.email);
    });
  }

  addMember() {
    this.showMembers = true;

    this.mainRest.addMember(+this.boardId, this.newMember).subscribe((member: { email: string }) => {
      this.members = [...this.members, member.email];
    });
  }

  removeMember(memberToRemove: string) {
    this.showMembers = true;

    this.mainRest.removeMember(+this.boardId, memberToRemove).subscribe(() => {
      this.members = this.members.filter((member) => member !== memberToRemove);
    });
  }
}
