import {HttpParams} from "@angular/common/http";

export class BaseHttpClientServiceService{

  protected createHttpParams(formData: FormData): HttpParams {
    let params = new HttpParams();
    formData.forEach((value, key) => {
      params = params.append(key, value as string);
    });
    return params;
  }
}
