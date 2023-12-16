import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {_MatSlideToggleRequiredValidatorModule, MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatButtonModule} from "@angular/material/button";
import {PermissionsComponent} from "../permissions/permissions.component";
import {AddNewAdminService} from "../core/services/add-new-admin/add-new-admin.service";
import {PermissionsService} from "../core/services/permissions/permissions.service";

@Component({
  selector: 'app-add-admin-page',
  standalone: true,
  imports: [
    MatSlideToggleModule,
    FormsModule,
    _MatSlideToggleRequiredValidatorModule,
    MatButtonModule,
    ReactiveFormsModule,
    PermissionsComponent,
  ],
  templateUrl: './add-admin-page.component.html',
  styleUrl: './add-admin-page.component.scss'
})
export class AddAdminPageComponent {

  public form: FormGroup;
  public permissions = {
    selectAdminFromList: false,
    actionWithCompetition: false,
    actionWithStatistic: false,
    permissionToTokenAndPrices: false,
    actionWithChatSecurity: false,
    editPermission: false
  };

  constructor(private readonly fb: FormBuilder, private addNewAdminService: AddNewAdminService, private permissionsService: PermissionsService) {
    this.form = this.getSignInForm();
    this.getPermissions();
  }

  public addNewAdmin(form: FormGroup): void {
    const formData = new FormData();

    formData.append('admin-info', this.form.value);

    console.log(this.permissions);

    formData.append('permissions', JSON.stringify(this.permissions));

    this.addNewAdminService.addNewAdmin(formData);
  }

  getPermissions(){
    this.permissionsService.getPermissionsSubject().subscribe((result) => {
      this.permissions = result.value;
    })
  }
  private getSignInForm(): FormGroup {
    return this.fb.group({
      tagname: ["", [Validators.required]],
    });
  }
}
