import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeOrmConfigService } from "../typorem/config";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { User } from "../entities/user";
import { AdministrationController } from "./administration.controller";
import { AdministrationService } from "./administration.service";

@Module({
  imports: [TypeOrmModule.forRootAsync({
    useClass: TypeOrmConfigService
  }),PassportModule,
    JwtModule.register({
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AdministrationController],
  providers: [AdministrationService],
})

export class AdminModule {}