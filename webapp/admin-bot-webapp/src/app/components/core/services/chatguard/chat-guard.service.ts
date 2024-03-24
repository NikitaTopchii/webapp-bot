import {Injectable} from "@angular/core";
import {BaseHttpClientService} from "../base-http-client-service/base-http-client.service";
import {HttpClient} from "@angular/common/http";
import {main_url} from "../../../../shared/application-context";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ChatGuardService extends BaseHttpClientService{

  constructor(private http: HttpClient) {
    super();
  }

  setChatSecurityStatus(chatSecurityStatus: string, chatId: string){
    return this.http
      .post<any>(main_url + '/channels/settings', this.createSettingsData(
        'CHATGUARD',
        chatSecurityStatus,
        chatId)
      );
  }

  setChatGamificationStatus(chatGamificationStatus: string, chatId: string){
    return this.http
      .post<any>(main_url + '/channels/settings', this.createSettingsData(
        'GAMIFICATION',
        chatGamificationStatus,
        chatId)
      );
  }

  setChatStopWordsStatus(chatStopWordsStatus: string, chatId: string){
    return this.http
      .post<any>(main_url + '/channels/settings', this.createSettingsData(
        'STOPWORDS',
        chatStopWordsStatus,
        chatId
      ));
  }

  setChatCommandStatus(chatCommandStatus: string, chatId: string){
    return this.http
      .post<any>(main_url + '/channels/settings', this.createSettingsData(
        'CHATCOMMANDS',
        chatCommandStatus,
        chatId
      ));
  }

  setChatCaptchaStatus(chatCaptchaStatus: string, chatId: string){
    return this.http
      .post<any>(main_url + '/channels/settings', this.createSettingsData(
        'CHATCAPTCHA',
        chatCaptchaStatus,
        chatId
      ));
  }

  getStopWordsByChatId(chatId: string){
    const formData = new FormData();

    formData.append('chatId', chatId);

    return this.http
      .get<any>(main_url + '/channels/stop-words', { params: this.createHttpParams(formData) })
      .pipe(map((response: any) => {
        console.log(response.results)
        return response.results[0].words.split(',').map((word: string) => {
          return {
            word: word,
            selected: false
          }
        })
      }))
  }

  deleteSelectedStopWords(stopWords: Set<string>, chatId: string){
    const stopWordsArray = Array.from(stopWords);
    return this.http.post<any>(main_url + '/channels/delete-selected-stop-words', this.createStopWordsData('DELWORDS', stopWordsArray, chatId));
  }

  deleteAllStopWords(chatId: string){
    return this.http.post<any>(main_url + '/channels/delete-all-stop-words', this.createStopWordsData('DELALLWORDS', [], chatId));
  }

  addNewStopWord(newWord: string, chatId: string){
    return this.http.post<any>(main_url + '/channels/add-stop-words', this.createStopWordsData('ADDWORDS', [newWord], chatId));
  }

  createSettingsData(action: string, value: string, chatId: string){
    return {
      action: action,
      value: parseInt(value),
      chat: parseInt(chatId),
      bot_id: localStorage.getItem('botid') || ''
    }
  }

  createStopWordsData(action: string, words: string[], chatId: string){
    return {
      action: action,
      words: words,
      chat: parseInt(chatId),
      bot_id: parseInt(localStorage.getItem('botid') || '')
    }
  }
}
