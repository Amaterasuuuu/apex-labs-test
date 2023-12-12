import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from 'src/task/entity';
import { ITask } from 'src/task/interface';
import { GetTaskByIdQuery } from '../queries';

@QueryHandler(GetTaskByIdQuery)
export class GetTaskByIdHandler implements IQueryHandler<GetTaskByIdQuery> {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<ITask>,
  ) {}

  async execute(query: GetTaskByIdQuery): Promise<ITask> {
    const { _id, user } = query;
    const task = await this.taskModel.findOne({ _id, creator: user });
    if (!task) {
      throw new NotFoundException('Task is not defined');
    }
    return task;
  }
}
