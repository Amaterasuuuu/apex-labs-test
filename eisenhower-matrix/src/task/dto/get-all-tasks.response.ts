import { ApiProperty } from '@nestjs/swagger';
import { ITask } from '../interface';
import { Task } from '../entity';
import { TaskType } from '../enum';

export class GetAllTasksResponse {
  @ApiProperty({
    description: `All ${TaskType.IMPORTANT_AND_URGENT} tasks`,
    type: Task,
  })
  toDo: ITask[];

  @ApiProperty({
    description: `All ${TaskType.IMPORTANT_AND_NOT_URGENT} tasks`,
    type: Task,
  })
  toDecide: ITask[];

  @ApiProperty({
    description: `All ${TaskType.NOT_IMPORTANT_AND_URGENT} tasks`,
    type: Task,
  })
  toDelegate: ITask[];

  @ApiProperty({
    description: `All ${TaskType.NOT_IMPORTANT_AND_NOT_URGENT} tasks`,
    type: Task,
  })
  toDelete: ITask[];
}
