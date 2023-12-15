import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {_MatSlideToggleRequiredValidatorModule, MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatButtonModule} from "@angular/material/button";
import {PermissionsComponent} from "../permissions/permissions.component";
import {AddNewAdminService} from "../core/services/add-new-admin/add-new-admin.service";

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

  constructor(private readonly fb: FormBuilder, private addNewAdminService: AddNewAdminService) {
    this.form = this.getSignInForm();
  }

  public addNewAdmin(form: FormGroup): void {
    const formData = new FormData();

    formData.append('admin-info', this.form.value);


  }
  private getSignInForm(): FormGroup {
    return this.fb.group({
      tagname: ["", [Validators.required]],
    });
  }
}
