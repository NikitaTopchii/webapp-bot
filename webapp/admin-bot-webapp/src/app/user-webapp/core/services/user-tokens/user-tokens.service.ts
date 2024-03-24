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
export class UserTokensService extends BaseHttpClientService{

  constructor(private http: HttpClient) {
    super();
  }

  getUserTokens(userId: string){
    const formData = new FormData();

    formData.append('userid', userId);

    return this.http.get<any>(main_url + '/users/user-tokens', { params: this.createHttpParams(formData) })
      .pipe(map((response: any) => {
        return response.map((userTokens: any) => {
          console.log(userTokens)
          return {
            tokenId: userTokens.id.split(':')[1],
            tokenName: userTokens.token_name
          }
        })
      }));
  }

  getUserTokenData(userId: string, tokenId: string){
    const formData = new FormData();

    formData.append('userid', userId);
    formData.append('tokenId', tokenId)

    return this.http.get<any>(main_url + '/users/user-token-data', { params: this.createHttpParams(formData) })
      .pipe(map((response: any) => {
        return response.map((userTokens: any) => {
          console.log(userTokens)
          return {
            tokenId: userTokens.tokenId,
            tokenName: userTokens.tokenName,
            tokenValue: userTokens.userTokenValue
          }
        })
      }));
  }

  updateUserItem(userTokenId: string, tokensLeft: number, itemId: string, itemType: string){
    const formData = new FormData();

    formData.append('userTokenId', userTokenId);
    formData.append('itemId', itemId);
    formData.append('itemType', itemType);
    formData.append('tokensLeft', tokensLeft.toString());

    return this.http.post<any>(main_url + '/users/update-items', formData).subscribe();
  }

  checkBoughtItem(userTokenId: string){
    const formData = new FormData();

    formData.append('userTokenId', userTokenId);

    return this.http.get<any>(main_url + '/users/check-bought-item',{ params: this.createHttpParams(formData) })
      .pipe(map((response) => response.bought));
  }
}
