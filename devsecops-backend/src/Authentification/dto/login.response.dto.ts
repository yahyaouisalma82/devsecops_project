import { Tokens } from "./Tokens";
import { User } from "../../entities/user";

export type loginresponseDto={
  user:User,
  token:Tokens
}