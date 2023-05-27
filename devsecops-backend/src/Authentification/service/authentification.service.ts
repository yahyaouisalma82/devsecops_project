import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../entities/user";
import { AuthHelper } from "./authHelper";
import { Repository } from "typeorm";
import { Tokens } from "../dto/Tokens";
import {v4 as uuidv4} from 'uuid';
import { LoginDto, RegisterDto } from "../dto/auth.dto";
import { loginresponseDto } from "../dto/login.response.dto";

@Injectable()
export class AuthService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  @Inject(AuthHelper)
  private readonly helper: AuthHelper;



  public async register(body: RegisterDto): Promise<User | never> {
    const { login, email, password,nom,prenom,role }: RegisterDto = body;
    let user: User = await this.repository.findOne({ where: { email } });

    if (user) {
      throw new HttpException('Conflict', HttpStatus.CONFLICT);
    }

    user = new User();
    user.id= uuidv4();
    user.login = login;
    user.email = email;
    user.nom=nom;
    user.prenom=prenom;
    user.roles=role
    user.password = this.helper.encodePassword(password);
    user=await this.repository.save(user);
    return user
  }


  public async login(body: LoginDto): Promise<loginresponseDto> {

    const { username, password }: LoginDto = body;
    const user: User = await this.repository.findOne({ where: { login:username } });
    if (!user) {
      throw new HttpException('No user found', HttpStatus.FORBIDDEN);
    }

    const isPasswordValid: boolean = await this.helper.isPasswordValid(password, user.password);

    if (!isPasswordValid) {
      throw new HttpException('No user found', HttpStatus.FORBIDDEN);
    }

    let token:Tokens =await this.helper.generateToken(user)
    return { user:user,token:token };


  }

  public async refresh(user: User): Promise<Tokens> {

    return this.helper.generateToken(user);
  }

  public async connected(user: User): Promise<User> {
    return  this.helper.validateUser(user)
  }


}