import {
  Body,
  ClassSerializerInterceptor,
  Controller, Get,
  HttpCode,
  HttpStatus,
  Inject,
  Post, UseGuards,
  UseInterceptors
} from "@nestjs/common";
import { AuthService } from "../service/authentification.service";
import { LoginDto, RegisterDto } from "../dto/auth.dto";
import { User } from "../../entities/user";
import { AuthGuard } from "@nestjs/passport";
import { Public } from "../../decorators/public.decorator";

@Controller('auth')
export class AuthController {
  @Inject(AuthService)
  private readonly service: AuthService;

  // @Post('register')
  @Public()
  @Post('registre')
  @UseInterceptors(ClassSerializerInterceptor)
  private register( @Body()body: RegisterDto) {
    return this.service.register(body);
  }
  /*
  * @Get('findByFilter/:params')
    async findByFilter(@Query() query): Promise<Article[]> {*/
  // @Post('oauth/token')
  //@UseGuards(AuthGuard('basic'))
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  private login( @Body()query:LoginDto) {
    return this.service.login(query);
  }

  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  @Get('testToken')
  private test( ) {
    return "hello"
  }


}