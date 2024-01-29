export interface TaskCreate {
  title: string;
  description: string;
  done: boolean;
  category: string;
  boardId: number;
}
