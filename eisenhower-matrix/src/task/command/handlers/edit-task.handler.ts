import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { BadRequestException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SuccessDto } from 'src/utils';
import { GetTaskByIdQuery } from 'src/task/query';
import { Task } from 'src/task/entity';
import { ITask } from 'src/task/interface';
import { EditTaskCommand } from '../commands';

@CommandHandler(EditTaskCommand)
export class EditTaskHandler implements ICommandHandler<EditTaskCommand> {
  constructor(
    private readonly queryBus: QueryBus,
    @InjectModel(Task.name) private readonly taskModel: Model<ITask>,
  ) {}

  async execute(command: EditTaskCommand): Promise<SuccessDto> {
    const { id, title, description, type, date, deadline, user } = command;
    const task = await this.queryBus.execute(new GetTaskByIdQuery(id, user));

    const day = new Date(date ? date : task.date);
    if (isNaN(day.getDate())) {
      throw new BadRequestException('Invalid Date!');
    }
    const timezone = day.getTimezoneOffset();
    day.setHours(0, 0 - timezone, 0);

    if (title || date) {
      const exist = await this.taskModel.findOne({
        title: title ? title : task.title,
        date: {
          $gte: day.getTime(),
          $lt: day.getTime() + 24 * 60 * 59 * 1000,
        },
      });
      if (exist) {
        throw new ConflictException(
          'Task with similar title for this day is already exists!',
        );
      }
    }

    title ? (task.title = title) : null;
    description ? (task.description = description) : null;
    type ? (task.type = type) : null;
    date ? (task.date = date) : null;
    deadline ? (task.deadline = deadline) : null;

    return await task.save();
  }
}
