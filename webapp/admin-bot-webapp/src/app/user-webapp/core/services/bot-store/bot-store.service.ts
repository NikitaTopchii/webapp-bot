import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {
  BaseHttpClientService
} from "../../../../components/core/services/base-http-client-service/base-http-client.service";
import {main_url} from "../../../../shared/application-context";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BotStoreService extends BaseHttpClientService{

  constructor(private http: HttpClient) {
    super();
  }

  getBotStoreItems(){
    return this.http.get<any>(main_url + '/bot-items/items').pipe(map((response) => response.map((item: any) => {
      console.log(item)
      return {
        itemId: item.item_id,
        itemName: item.title,
        itemDescription: item.description,
        itemPrice: item.price,
        itemType: item.type
      }
    })));
  }
}
