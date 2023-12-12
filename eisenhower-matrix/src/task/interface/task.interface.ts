import { IUser } from 'src/user';
import { TaskType } from '../enum';

export interface ITask {
  _id: string;
  title: string;
  description?: string;
  type: TaskType;
  completed: boolean;
  deadline?: Date;
  created_at: Date;
  updated_at: Date;
  creator: IUser;
}
