import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";

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
  public actionWithStatistic =  false;
  public permissionToTokenAndPrices = false;
  public actionWithChatSecurity = false;
  public editPermission = false;


  constructor(private readonly fb: FormBuilder) {
    this.permissionsForm = this.getPermissionsForm();
  }

  private getPermissionsForm(){
    return this.fb.group({
      selectAdminFromList: [this.selectAdminFromList],
      actionWithCompetition: [this.actionWithCompetition],
      actionWithStatistic: [this.actionWithStatistic],
      permissionToTokenAndPrices: [this.permissionToTokenAndPrices],
      actionWithChatSecurity: [this.actionWithChatSecurity],
      editPermission: [this.editPermission]
    })
  }

  setPermissions(form: FormGroup){
    console.log(form.value);
  }
}
