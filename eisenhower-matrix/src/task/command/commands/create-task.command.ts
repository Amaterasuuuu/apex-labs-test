import { IUser } from 'src/user';
import { TaskType } from 'src/task/enum';

export class CreateTaskCommand {
  constructor(
    public readonly title: string,
    public readonly description: string,
    public readonly type: TaskType,
    public readonly date?: Date,
    public readonly deadline?: Date,
    public readonly user?: IUser,
  ) {}
}
