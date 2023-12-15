import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {_MatSlideToggleRequiredValidatorModule, MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatButtonModule} from "@angular/material/button";
import {PermissionsComponent} from "../permissions/permissions.component";

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

  constructor(private readonly fb: FormBuilder) {
    this.form = this.getSignInForm();
  }

  public signUp(form: FormGroup): void {
    console.log(form.value);
  }
  private getSignInForm(): FormGroup {
    return this.fb.group({
      tagname: ["", [Validators.required]],
    });
  }
}
