import { IUser } from 'src/user';

export class CompleteTaskCommand {
  constructor(public readonly id: string, public readonly user?: IUser) {}
}
