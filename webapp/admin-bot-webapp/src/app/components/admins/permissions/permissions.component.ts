import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {Subject} from "rxjs";
import {PermissionsService} from "../../core/services/permissions/permissions.service";

@Component({
  selector: 'app-permissions',
  standalone: true,
    imports: [
        FormsModule,
        MatSlideToggleModule,
        ReactiveFormsModule
    ],
  templateUrl: './permissions.component.html',
  styleUrl: './permissions.component.scss'
})
export class PermissionsComponent {

  public permissionsForm: FormGroup;

  public selectAdminFromList = false;
  public actionWithCompetition = false;
  public editPermission = false;


  constructor(private readonly fb: FormBuilder, private permissionsService: PermissionsService) {
    this.permissionsForm = this.getPermissionsForm();
    this.permissionsForm.valueChanges.subscribe(() => {
      this.permissionsService.checkPermissionValuesState(this.permissionsForm);
    })
  }

  private getPermissionsForm(){
    this.setCurrentPermissions();
    return this.fb.group({
      selectAdminFromList: [this.selectAdminFromList],
      actionWithCompetition: [this.actionWithCompetition],
      editPermission: [this.editPermission]
    })
  }

  setCurrentPermissions(){
    const currentAdminPermissions = this.permissionsService.getCurrentAdminPermissions();
    if(currentAdminPermissions){
      this.selectAdminFromList = currentAdminPermissions.selectAdminFromList;
      this.actionWithCompetition = currentAdminPermissions.actionWithCompetition;
      this.editPermission = currentAdminPermissions.editPermission;
    }
  }

  setPermissions(form: FormGroup){
    console.log(form.value);
  }
}
