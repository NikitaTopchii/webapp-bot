import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { main_url } from "../../shared/application-context";
import { HelpersService } from "../../core/services/helpers/helpers.service";

interface CreateStoreRequest {
  name: string;
  description: string;
  tokenId: string;
  owner_id: string;
}

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private http: HttpClient,
              private helpersService: HelpersService) { }

  public createStore(data: CreateStoreRequest): Observable<any> {
    return this.http
      .post(main_url + '/admin-store/create-store', this.helpersService.generateFormData(data));
  }
}
