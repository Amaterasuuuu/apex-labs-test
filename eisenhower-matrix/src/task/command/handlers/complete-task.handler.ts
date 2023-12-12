import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { CompleteTaskCommand } from '../commands';
import { GetTaskByIdQuery } from 'src/task/query';
import { SuccessDto } from 'src/utils';

@CommandHandler(CompleteTaskCommand)
export class CompleteTaskHandler
  implements ICommandHandler<CompleteTaskCommand>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(command: CompleteTaskCommand): Promise<SuccessDto> {
    const { id, user } = command;
    const task = await this.queryBus.execute(new GetTaskByIdQuery(id, user));

    task.completed = !task.completed;
    return await task.save();
  }
}
