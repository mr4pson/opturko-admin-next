import { Role } from "../enums/role.enum";

export interface IUser {
  id: string;
  publicAddress: string;
  username: string;
  role: Role;
  nonce: number;
}