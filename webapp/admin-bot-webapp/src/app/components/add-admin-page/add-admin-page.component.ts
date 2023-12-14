import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {_MatSlideToggleRequiredValidatorModule, MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-add-admin-page',
  standalone: true,
  imports: [
    MatSlideToggleModule,
    FormsModule,
    _MatSlideToggleRequiredValidatorModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './add-admin-page.component.html',
  styleUrl: './add-admin-page.component.scss'
})
export class AddAdminPageComponent {

  public form: FormGroup;
  public permissionsForm: FormGroup;

  public selectAdminFromList = false;
  public actionWithCompetition = false;
  public actionWithStatistic =  false;
  public permissionToTokenAndPrices = false;
  public actionWithChatSecurity = false;
  public editPermission = false;


  constructor(private readonly fb: FormBuilder) {
    this.form = this.getSignInForm();
    this.permissionsForm = this.getPermissionsForm();
  }

  public signUp(form: FormGroup): void {
    console.log(form.value);
  }
  private getSignInForm(): FormGroup {
    return this.fb.group({
      email: ["", [Validators.required]],
    });
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

  alertFormValues(formGroup: FormGroup) {
    alert(JSON.stringify(formGroup.value, null, 2));
  }
}
