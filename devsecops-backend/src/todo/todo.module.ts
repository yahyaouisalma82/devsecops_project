import { Module } from '@nestjs/common'; 
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from './Entity/todo.entity';
import { TodoService } from './todo.service';
import { TodoDBController } from './todoDB.controller';

@Module({
  controllers: [TodoDBController],
  imports: [TypeOrmModule.forFeature([TodoEntity])],
  providers: [TodoService],
})
export class TodoModule {}
