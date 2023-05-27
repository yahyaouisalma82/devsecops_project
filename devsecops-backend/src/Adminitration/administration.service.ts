import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entities/user";
import { Repository } from "typeorm";
import { UserDto } from "./dto/user.dto";
import { RechercheUserDto } from "./dto/recherche.user.dto";

@Injectable()
export class AdministrationService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  async getUsers(paginationUser) {
     const [result, total] = await this.repository.findAndCount({
      take: 5,
      skip: paginationUser.pagination*5
    });
    return {
      data: result,
      count: total
    }
  }

  async rechercheUser(rechercheUserDto:RechercheUserDto) {
    const [result, total] = await this.repository.findAndCount({
      take: 5,
      skip: rechercheUserDto.pagination*5,
      where:rechercheUserDto.user
    });
    return {
      data: result,
      count: total
    }
  }

  getUserById(userid:string){
    return this.repository.findOneBy({id:userid})
  }
  async updateUserInfo(user) {
    await this.repository.update(user.userid, user.newuser)
    return this.getUserById(user.userid)
  }
  private mapperUser(user:User):UserDto{
    return{
      email:user.email, login:user.login, nom: user.nom, prenom:user.prenom, roles: user.roles
    }
  }
}