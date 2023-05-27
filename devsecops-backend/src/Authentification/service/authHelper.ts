import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../entities/user";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs';
import { Tokens } from "../dto/Tokens";

@Injectable()
export class AuthHelper {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  private readonly jwt: JwtService;

  constructor(jwt: JwtService) {
    this.jwt = jwt;
  }

  // Decoding the JWT Token
  public async decode(token: string): Promise<unknown> {
    return this.jwt.decode(token, null);
  }

  // Get UserDto by UserDto ID we get from decode()
  public async validateUser(decoded: any): Promise<User> {
    return this.repository.findOneById(decoded.id);
  }

  // Generate JWT Token
  public async generateToken(user: User): Promise<Tokens> {
    const [at, rt] = ([
      this.jwt.sign(
        {id: user.id, email: user.email},
        {
          secret: 'Gl4RouaHedilSoulaima',
          expiresIn:'3h'
        }
      ),
      this.jwt.sign(
        {id: user.id, email: user.email},
        {
          secret: 'Gl4RouaHedilSoulaima',
          expiresIn:'3h'
        }
      )

    ]);
    // const hash = await argon.hash(at);
    return {
      username: user.login,
      role: user.roles,
      access_token: at,
      token_type: process.env.token_type,
      refresh_token: rt,
      expires_in: process.env.JWT_EXPIRES
    };
  }

  // Validate UserDto's password
  public async isPasswordValid(password, userPassword): Promise<boolean> {
    return bcrypt.compare(password, userPassword.trim());
  }

  // Encode UserDto's password
  public encodePassword(password: string): string {
    const salt: string = bcrypt.genSaltSync(10);

    return bcrypt.hashSync(password, salt);
  }

  // Validate JWT Token, throw forbidden error if JWT Token is invalid
  private async validate(token: string): Promise<boolean | never> {
    const decoded: unknown = this.jwt.verify(token);

    if (!decoded) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    const user: User = await this.validateUser(decoded);

    if (!user) {
      throw new UnauthorizedException();
    }

    return true;
  }
}