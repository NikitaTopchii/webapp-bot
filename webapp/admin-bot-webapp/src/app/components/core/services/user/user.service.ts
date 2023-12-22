import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private router: Router) {
  }

  signIn(formData: FormData) {
    // Создание параметров из formData
    let params = new HttpParams();
    formData.forEach((value, key) => {
      params = params.append(key, value as string);
    });

    return this.http
      .get<string>('http://localhost:3000/users/auth', { params: params })
      .subscribe((response) => {

        const userId = JSON.parse(JSON.stringify(response)).result;

        if(userId){
          this.router.navigate(['admins-list']);
        }
      });
  }
}
