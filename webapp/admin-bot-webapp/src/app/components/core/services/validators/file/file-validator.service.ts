import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class FileValidatorService {

  constructor() {
  }

  fileValidator(validExtensions: string[]): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const file = control.value;
      if (file) {
        const extension = file.name.split('.').pop().toLowerCase();
        if (!validExtensions.includes(extension)) {
          return { 'invalidFileType': true };
        }
      }
      return null;
    };
  }

}
