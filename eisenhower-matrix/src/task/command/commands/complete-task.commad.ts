import { IUser } from 'src/user';

export class DeleteTaskCommand {
  constructor(public readonly id: string, public readonly user?: IUser) {}
}
