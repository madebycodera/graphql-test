import { InputTodo } from '../graphql.schema';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export default class TodoDto extends InputTodo {
  @IsInt()
  @Min(1)
  @Max(32767)
  @IsOptional()
  priority?: number;
}
