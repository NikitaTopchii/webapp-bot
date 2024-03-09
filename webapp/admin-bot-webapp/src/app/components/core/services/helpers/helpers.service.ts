import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelpersService {

  constructor() { }

  public generateFormData(data: any, formData: FormData = new FormData(), namespace = ''): FormData {
    Object.keys(data).forEach(key => {
      if (data[key] === null || data[key] === undefined) return;

      let formKey = namespace ? `${namespace}[${key}]` : key;

      if (typeof data[key] === 'object' && !(data[key] instanceof File)) {
        this.generateFormData(data[key], formData, formKey);
      } else {
        formData.append(formKey, data[key]);
      }
    });

    return formData;
  }
}
