import { IUser } from 'src/user';

export class GetTaskByIdQuery {
  constructor(public readonly _id: string, public readonly user: IUser) {}
}
