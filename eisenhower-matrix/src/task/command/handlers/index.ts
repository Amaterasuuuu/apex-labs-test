import { Provider } from '@nestjs/common';
import { CreateTaskHandler } from './create-task.handler';
import { DeleteTaskHandler } from './delete-task.handler';
import { CompleteTaskHandler } from './complete-task.handler';
import { EditTaskHandler } from './edit-task.handler';

export const CommandHandlers: Provider[] = [
  CreateTaskHandler,
  EditTaskHandler,
  CompleteTaskHandler,
  DeleteTaskHandler,
];
