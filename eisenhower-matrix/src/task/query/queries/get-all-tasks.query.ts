import { IUser } from 'src/user';

export class GetAllTasksQuery {
  constructor(
    public readonly page: number,
    public readonly limit: number,
    public readonly date?: Date,
    public readonly user?: IUser,
  ) {}
}
