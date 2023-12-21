import {Injectable} from "@angular/core";
import {HttpService} from "../http/http.service";
import {Subject} from "rxjs";
import {FormGroup} from "@angular/forms";


@Injectable({
  providedIn: 'root'
})
export class PermissionsService {

  private permissionsSubject = new Subject<FormGroup>();
  private currentAdminPermissions: any;
  constructor() {
  }

  checkPermissionValuesState(form: FormGroup){
    for (const key in form.value) {
      if (form.value[key] === true) {
        this.permissionsSubject.next(form);
      }
    }
    this.permissionsSubject.next(form);
  }

  setCurrentAdminPermissions(currentAdminPermissions: any){
    console.log('set current admin permissions')
    console.log(currentAdminPermissions)
    this.currentAdminPermissions = currentAdminPermissions;
  }

  getCurrentAdminPermissions(){
    console.log('--')
    console.log(this.currentAdminPermissions)
    return this.currentAdminPermissions;
  }

  getPermissionsSubject(){
    return this.permissionsSubject;
  }
}