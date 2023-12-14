import {UserInterface} from "./user.interface";
import {PermissionsInterface} from "./permissions.interface";

export class Admin implements UserInterface{
  id: string;
  name: string;
  role: string;
  permissions: PermissionsInterface = {
    selectAdminFromList: false,
    actionWithCompetition: false,
    actionWithStatistic: false,
    permissionToTokenAndPrices: false,
    actionWithChatSecurity: false,
    editPermission: false
  };

  constructor(id: string, name: string, role: string) {
    this.id = id;
    this.role = role;
    this.name = name;
  }

  setPermissions(permissions: PermissionsInterface){
    this.permissions = permissions;
  }
}
