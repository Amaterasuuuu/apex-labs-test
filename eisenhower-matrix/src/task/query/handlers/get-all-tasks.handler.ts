import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from 'src/task/entity';
import { ITask } from 'src/task/interface';
import { TaskType } from 'src/task/enum';
import { GetAllTasksResponse } from 'src/task/dto';
import { GetAllTasksQuery } from '../queries';

@QueryHandler(GetAllTasksQuery)
export class GetAllTasksHandler implements IQueryHandler<GetAllTasksQuery> {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<ITask>,
  ) {}

  async execute(query: GetAllTasksQuery): Promise<GetAllTasksResponse> {
    const { page = 1, limit = 20, date, user } = query;
    const findQuery: { date?: { $gt: number; $lt: number } } = {};

    if (date) {
      const day = new Date(date);
      if (isNaN(day.getDate())) {
        throw new BadRequestException('Invalid Date!');
      }
      day.setHours(0, 0, -1);
      findQuery.date = {
        $gt: day.getTime(),
        $lt: day.getTime() + 24 * 60 * 59 * 1000,
      };
    }

    const [toDo, toDecide, toDelegate, toDelete] = await Promise.all(
      Object.values(TaskType).map((type) =>
        this.taskModel
          .find({ type, creator: user, ...findQuery })
          .limit(limit)
          .skip((page - 1) * limit),
      ),
    );

    return { toDo, toDecide, toDelegate, toDelete };
  }
}
