import {Injectable} from "@angular/core";
import {BaseHttpClientServiceService} from "../base-http-client-service/base-http-client-service.service";
import {HttpClient} from "@angular/common/http";
import {main_url} from "../../../shared/application-context";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ChatGuardService extends BaseHttpClientServiceService{

  constructor(private http: HttpClient) {
    super();
  }

  setChatSecurityStatus(chatSecurityStatus: string, chatId: string){
    const formData = new FormData();

    formData.append('chatSecurityStatus', chatSecurityStatus);
    formData.append('chatId', chatId);

    return this.http
      .post<any>(main_url + '/channels/chat-security-status', formData);
  }

  setChatGamificationStatus(chatGamificationStatus: string, chatId: string){
    const formData = new FormData();

    formData.append('chatGamificationStatus', chatGamificationStatus);
    formData.append('chatId', chatId);

    return this.http
      .post<any>(main_url + '/channels/chat-gamification-status', formData);
  }

  setChatStopWordsStatus(chatStopWordsStatus: string, chatId: string){
    const formData = new FormData();

    formData.append('chatStopWordsStatus', chatStopWordsStatus);
    formData.append('chatId', chatId);

    return this.http
      .post<any>(main_url + '/channels/chat-stop-words-status', formData);
  }

  setChatCommandStatus(chatCommandStatus: string, chatId: string){
    const formData = new FormData();

    formData.append('chatCommandStatus', chatCommandStatus);
    formData.append('chatId', chatId);

    return this.http
      .post<any>(main_url + '/channels/chat-command-status', formData);
  }

  setChatCaptchaStatus(chatCommandStatus: string, chatId: string){
    const formData = new FormData();

    formData.append('chatCaptchaStatus', chatCommandStatus);
    formData.append('chatId', chatId);

    return this.http
      .post<any>(main_url + '/channels/chat-captcha-status', formData);
  }

  getStopWordsByChatId(chatId: string){
    const formData = new FormData();

    formData.append('chatId', chatId);

    return this.http
      .get<any>(main_url + '/channels/stop-words', { params: this.createHttpParams(formData) })
      .pipe(map((response: any) => {
        console.log(response.results)
        return response.results[0].words.split('')
      }))
  }
}
