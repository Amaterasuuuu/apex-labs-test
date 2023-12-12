import {
  Query,
  Param,
  Body,
  Controller,
  Get,
  Post,
  Delete,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  ApiTags,
  ApiOperation,
  ApiUnauthorizedResponse,
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiSecurity,
} from '@nestjs/swagger';
import { AuthGuard, CurrentUser } from 'src/auth';
import { IUser } from 'src/user';
import { ExceptionDto, FindByIdDto, SuccessDto } from '../utils';
import { Task } from './entity';
import { ITask } from './interface';
import {
  CreateTaskDto,
  EditTaskDto,
  GetAllTasksDto,
  GetAllTasksResponse,
} from './dto';
import { GetAllTasksQuery } from './query';
import {
  CompleteTaskCommand,
  CreateTaskCommand,
  DeleteTaskCommand,
  EditTaskCommand,
} from './command';

@ApiSecurity('bearer')
@UseGuards(AuthGuard)
@ApiTags('Task')
@Controller('task')
export class TaskController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get list of tasks by each type and a such date' })
  @ApiOkResponse({ description: 'List of tasks', type: GetAllTasksResponse })
  @ApiBadRequestResponse({ description: 'Invalid Date!', type: ExceptionDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized', type: ExceptionDto })
  async findAll(
    @Query() { page, limit, date }: GetAllTasksDto,
    @CurrentUser() user: IUser,
  ): Promise<GetAllTasksResponse> {
    return await this.queryBus.execute(
      new GetAllTasksQuery(page, limit, date, user),
    );
  }

  @Post()
  @ApiOperation({ summary: 'Create new task' })
  @ApiOkResponse({ description: 'Task was created successfully', type: Task })
  @ApiBadRequestResponse({ description: 'Invalid Date!', type: ExceptionDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized', type: ExceptionDto })
  @ApiConflictResponse({
    description: 'Task with similar title for this day is already exists!',
    type: ExceptionDto,
  })
  async create(
    @Body() { title, description, type, date, deadline }: CreateTaskDto,
    @CurrentUser() user: IUser,
  ): Promise<ITask> {
    return await this.commandBus.execute(
      new CreateTaskCommand(title, description, type, date, deadline, user),
    );
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Edit such task' })
  @ApiOkResponse({
    description: 'Task was edited successfully',
    type: Task,
  })
  @ApiBadRequestResponse({ description: 'Invalid Date!', type: ExceptionDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized', type: ExceptionDto })
  @ApiNotFoundResponse({
    description: 'Task is not defined!',
    type: ExceptionDto,
  })
  @ApiConflictResponse({
    description: 'Task with similar title for this day is already exists!',
    type: ExceptionDto,
  })
  async edit(
    @Param() { id }: FindByIdDto,
    @Body() { title, description, type, date, deadline }: EditTaskDto,
    @CurrentUser() user: IUser,
  ): Promise<ITask> {
    return await this.commandBus.execute(
      new EditTaskCommand(id, title, description, type, date, deadline, user),
    );
  }

  @Patch('/:id/complete')
  @ApiOperation({ summary: 'Complete such task' })
  @ApiOkResponse({
    description: 'Task was completed successfully',
    type: Task,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized', type: ExceptionDto })
  @ApiNotFoundResponse({
    description: 'Task is not defined!',
    type: ExceptionDto,
  })
  async complete(
    @Param() { id }: FindByIdDto,
    @CurrentUser() user: IUser,
  ): Promise<ITask> {
    return await this.commandBus.execute(new CompleteTaskCommand(id, user));
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete such task' })
  @ApiOkResponse({
    description: 'Task was deleted successfully',
    type: SuccessDto,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized', type: ExceptionDto })
  @ApiNotFoundResponse({
    description: 'Task is not defined!',
    type: ExceptionDto,
  })
  async delete(
    @Param() { id }: FindByIdDto,
    @CurrentUser() user: IUser,
  ): Promise<ITask> {
    return await this.commandBus.execute(new DeleteTaskCommand(id, user));
  }
}
