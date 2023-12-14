import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-admin-page',
  standalone: true,
  imports: [
    ReactiveFormsModule
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
