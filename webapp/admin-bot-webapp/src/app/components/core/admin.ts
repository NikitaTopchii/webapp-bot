import {User} from "./user";

export class Admin implements User{
  id: string;
  name: string;
  role: string;

  constructor(id: string, name: string, role: string) {
    this.id = id;
    this.role = role;
    this.name = name;
  }
}
