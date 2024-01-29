export interface Task {
  board_id: number;
  category: string;
  created_at: Date;
  created_by: number;
  description: string;
  done: boolean;
  id: number;
  title: string;
  updated_at: Date;
  updated_by: number;
}
