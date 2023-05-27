import { Module } from '@nestjs/common';
import { AuthService } from "./service/authentification.service";
import { AuthController } from "./controller/authentification.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeOrmConfigService } from "../typorem/config";
import { User } from "../entities/user";
import { AuthHelper } from "./service/authHelper";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { AtStrategy } from "./strategies";
import { AdminModule } from "../Adminitration/admin.module";

@Module({
  imports: [AdminModule,TypeOrmModule.forRootAsync({
    useClass: TypeOrmConfigService
  }),PassportModule,
    JwtModule.register({
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [AuthService,AuthHelper,AtStrategy],
})

export class AuthModule {}
