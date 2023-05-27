import {
  Body,
  ClassSerializerInterceptor,
  Controller, Get,
  HttpCode,
  HttpStatus,
  Inject, Param,
  Post, UseGuards,
  UseInterceptors
} from "@nestjs/common";
import { Public } from "../decorators/public.decorator";
import { AdministrationService } from "./administration.service";
import { User } from "../entities/user";

@Controller('admin')
export class AdministrationController {
  @Inject(AdministrationService)
  private readonly service: AdministrationService;
  @Public()
  @Post('allUser')
  private getUsers(@Body() paginationUser):Promise<{ data: User[]; count: number }> {
    return this.service.getUsers(paginationUser)
  }

  @Public()
  @Post('rechercheUser')
  private RechercheUser(@Body() paginationUser):Promise<{ data: User[]; count: number }> {
    return this.service.rechercheUser(paginationUser)
  }
  @Public()
  @Post('userById')
  private getUserById(@Body() userid) {
    return this.service.getUserById(userid.userid)
  }

  @Public()
  @Post('updateuser')
  private updateUserInfo(@Body() userBody) {
    return this.service.updateUserInfo(userBody)
  }

}