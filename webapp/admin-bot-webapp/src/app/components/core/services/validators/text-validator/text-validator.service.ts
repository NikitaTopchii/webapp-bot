import { Injectable } from '@angular/core';
import {AbstractControl, ValidatorFn} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class TextValidatorService {

  constructor() { }

  urlValidator(): ValidatorFn {
    const urlPattern: RegExp = /^(ftp|http|https):\/\/[^ "]+$/;

    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        return null;
      }

      const isValid = urlPattern.test(control.value);

      return isValid ? null : { 'invalidUrl': { value: control.value } };
    };
  }
}
