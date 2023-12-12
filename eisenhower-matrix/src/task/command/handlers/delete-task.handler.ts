import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from 'src/task/entity';
import { ITask } from 'src/task/interface';
import { DeleteTaskCommand } from '../commands';
import { GetTaskByIdQuery } from 'src/task/query';
import { SuccessDto } from 'src/utils';

@CommandHandler(DeleteTaskCommand)
export class DeleteTaskHandler implements ICommandHandler<DeleteTaskCommand> {
  constructor(
    private readonly queryBus: QueryBus,
    @InjectModel(Task.name) private readonly taskModel: Model<ITask>,
  ) {}

  async execute(command: DeleteTaskCommand): Promise<SuccessDto> {
    const { id, user } = command;
    const task = await this.queryBus.execute(new GetTaskByIdQuery(id, user));
    await this.taskModel.deleteOne({ _id: task._id });
    return {
      success: true,
      message: 'Task was deleted successfully',
    };
  }
}
