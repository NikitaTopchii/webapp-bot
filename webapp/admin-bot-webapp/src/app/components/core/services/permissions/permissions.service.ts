import {Injectable} from "@angular/core";
import {HttpService} from "../http/http.service";
import {Subject} from "rxjs";
import {FormGroup} from "@angular/forms";
import {PermissionsInterface} from "../../permissions.interface";

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {

  private adminPermissionsSubject = new Subject<FormGroup>();
  private chatPermissionsSubject = new Subject<FormGroup>();

  private currentAdminPermissions: any;
  private currentChatPermissions = new Map<string, PermissionsInterface>();
  constructor() {
  }

  checkAdminPermissionValuesState(form: FormGroup){
    for (const key in form.value) {
      if (form.value[key] === true) {
        this.adminPermissionsSubject.next(form);
      }
    }
    this.adminPermissionsSubject.next(form);
  }

  setCurrentAdminPermissions(currentAdminPermissions: PermissionsInterface){
    console.log('set current admin admin-permissions')
    console.log(currentAdminPermissions)
    this.currentAdminPermissions = currentAdminPermissions;
  }

  getCurrentAdminPermissions(){
    console.log('--')
    console.log(this.currentAdminPermissions)
    return this.currentAdminPermissions;
  }

  getAdminPermissionsSubject(){
    return this.adminPermissionsSubject;
  }

  checkChatPermissionValuesState(form: FormGroup){
    for (const key in form.value) {
      if (form.value[key] === true) {
        this.chatPermissionsSubject.next(form);
      }
    }
    this.chatPermissionsSubject.next(form);
  }

  setCurrentChatPermissions(chatId: string, currentChatPermissions: PermissionsInterface){
    console.log('chat id: ' + chatId)
    console.log('permissions: ')
    console.log(currentChatPermissions)
    this.currentChatPermissions.set(chatId, currentChatPermissions);
  }

  getCurrentChatPermissions(chatId: string): any{
    console.log('chatId: ')
    console.log(chatId)

    console.log('this.currentChatPermissions')
    console.log(this.currentChatPermissions)
    console.log('-=-=-=-=--=-=-=-=-=--==-')

    console.log('-------------------------------')
    console.log(this.currentChatPermissions.get(chatId))
    console.log('-------------------------------')

    const permissions = this.currentChatPermissions.get(chatId);

    return permissions || {};
  }

  getChatPermissionsSubject(){
    return this.chatPermissionsSubject;
  }
}
