import {PermissionsInterface} from "./permissions.interface";
import {TelegramEntityInterface} from "./telegram-entity/telegram-entity.interface";

export class Chat{

  chatId: string;
  currentAdminId: string;
  ownerId: string;
  selected: boolean = false;
  name: string = '';

  permissions: PermissionsInterface = {
    selectAdminFromList: false,
    actionWithCompetition: false,
    editPermission: false
  };

  constructor(chatId: string, currentAdminId: string, ownerId: string, permissions?: any, chatName?: any) {
    this.chatId = chatId;
    this.currentAdminId = currentAdminId;
    this.ownerId = ownerId;
    this.setPermissionsR(permissions);
    this.name = chatName;
  }
  setPermissions(permissions: PermissionsInterface){
    this.permissions = permissions;
  }

  setPermissionsR(permissions: any){
    if(permissions){
      this.permissions = {
        actionWithCompetition: permissions.create_competition,
        editPermission: permissions.edit_permissions,
        selectAdminFromList: permissions.show_admins
      }
    }
  }

  setChatName(name: string){
    this.name = name;
  }

  select(){
    this.selected = !this.selected;
  }
}
