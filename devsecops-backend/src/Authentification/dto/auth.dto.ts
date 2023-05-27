import { Trim } from 'class-sanitizer';
import {IsEmail, IsNotEmpty, IsOptional, IsString, MinLength} from 'class-validator';

export class RegisterDto {
  @Trim()
  @IsEmail()
  @IsNotEmpty()
  public readonly email: string;

  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  public readonly password: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  public readonly login?: string;

  nom:string
  prenom:string
  role:string
}

export class LoginDto {
  @Trim()
  //@IsEmail()
  @IsNotEmpty()
  public readonly username: string;
  //public readonly grant_type:string;


  @IsString()
  @IsNotEmpty()
  public readonly password: string;

  /*@IsString()
  @IsNotEmpty()
  public readonly location: string;*/
}