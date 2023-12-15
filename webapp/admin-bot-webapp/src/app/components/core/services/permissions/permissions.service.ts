import {Injectable} from "@angular/core";
import {HttpService} from "../http/http.service";
import {Subject} from "rxjs";
import {FormGroup} from "@angular/forms";


@Injectable({
  providedIn: 'root'
})
export class PermissionsService {

  private permissionsSubject = new Subject<FormGroup>();
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

  getPermissions(){
    return this.permissionsSubject;
  }
}
