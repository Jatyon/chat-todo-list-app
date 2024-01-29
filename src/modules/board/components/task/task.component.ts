import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MainRest } from '@core/modules/rest/main.rest';
import { Task } from '@modules/board/models/task.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  constructor(private mainRest: MainRest, private route: ActivatedRoute, private router: Router) {}

  board: string | null = '';
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

  ngOnInit() {
    if (this.route.snapshot.paramMap.get('id') === null) this.router.navigate(['/']);

    this.board = this.route.snapshot.paramMap.get('id');

    this.mainRest.getTasks(parseInt(this.board as string)).subscribe((tasks: Task[]) => {
      console.log(tasks);
      this.tasks = tasks;
    });
  }

  submitTask() {
    this.mainRest
      .addTasks(this.addTask.title, this.addTask.category, this.addTask.description, this.addTask.done, parseInt(this.board as string))
      .subscribe((task: Task) => {
        this.tasks = [...this.tasks, task];
      });
  }

  showDetailsTask(id: number) {
    this.showTaskDetails = true;
    this.taskDetails = { ...(this.tasks.find((task) => task.id === id) as Task) };
  }

  hideDetailsTask(id: number) {
    const oldTask: Task = this.tasks.find((task) => task.id === id) as Task;

    if (!this.compareTask(oldTask)) {
      this.mainRest.updateTask(id, this.taskDetails).subscribe((data: Task) => {
        this.tasks = this.tasks.map((task) => {
          if (task.id === id)
            return { ...task, title: data.title, category: data.category, description: data.description, done: data.done };
          return task;
        });
      });
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
    this.mainRest.doneTask(id).subscribe((task: Task) => {
      this.tasks = this.tasks.map((task) => {
        if (task.id === id) return { ...task, done: true };
        return task;
      });
    });
  }

  deleteTask(id: number) {
    this.mainRest.deleteTask(id).subscribe(() => {
      this.tasks = this.tasks.filter((task) => task.id !== id);
    });
  }
}
