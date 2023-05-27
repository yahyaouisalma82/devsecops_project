import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common'; 
import { TodoService } from './todo.service';
import { TodoEntity } from './Entity/todo.entity';
import { UpdateTodoDto } from './update-todo.dto';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';
import { SearchTodoDto } from './dto/search-todo.dto';
import { AuthGuard } from '@nestjs/passport'; 
import { Public } from 'src/decorators/public.decorator'; 
import { Roles } from '../decorators/public.decorator';
import { GetUser } from 'src/decorators/getUser.paramDecorater';
import { AtGuard } from 'src/Guards/atGuard';
import { User } from 'src/entities/user';
@Controller({
  path: 'todo', 
})
@Roles('user')
export class TodoDBController {
  constructor(private todoService: TodoService) {}
  @Public()
  @Get()
  getTodos(@Query() searchTodoDto: SearchTodoDto): Promise<TodoEntity[]> {
    return this.todoService.findAll(searchTodoDto);
  } 
  @Post()
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'), AtGuard)
  addTodo(
    @Body() newTodoData: Partial<TodoEntity>,
    @GetUser() user: User,
  ): Promise<TodoEntity> {
    console.log(newTodoData);
    return this.todoService.addTodo(newTodoData,user);
  }
  @Patch(':id')
  updateTodo(
    @Body() updateTodoDto: UpdateTodoDto,
    @Param('id') id: string,
  ): Promise<TodoEntity> {
    return this.todoService.updateTodo(updateTodoDto, id);
  }
  @Delete(':id')
  deleteTodo(@Param('id') id: string): Promise<DeleteResult> {
    return this.todoService.deleteTodo(id);
  }
  @Delete('/soft/:id')
  softDeleteTodo(@Param('id') id: string): Promise<UpdateResult> {
    return this.todoService.softDeleteTodo(id);
  }
  @Patch('/soft/:id')
  softRestoreTodo(@Param('id') id: string): Promise<UpdateResult> {
    return this.todoService.softRestoreTodo(id);
  }
}
