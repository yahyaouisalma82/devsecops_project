import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from "./Authentification/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeOrmConfigService } from "./typorem/config";
import { APP_GUARD } from "@nestjs/core";
import { AtGuard } from "./Guards/atGuard";
import { TodoModule } from './todo/todo.module';
import { ArticleModule } from './article/article.module';


@Module({
  imports: [AuthModule,
    TypeOrmModule.forRootAsync({
    useClass: TypeOrmConfigService
  }),
    TodoModule,
    ArticleModule,],

  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: AtGuard,
  },],
})
export class AppModule {}
