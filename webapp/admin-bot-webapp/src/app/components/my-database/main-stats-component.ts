import {TelegramService} from "../core/services/telegram/telegram.service";

export class MainStatsComponent{

  constructor(public telegramService: TelegramService) {
  }

  protected downloadAllElementsStats(statisticsType: string, elementIds?: string) {
    this.telegramService.sendData(this.getDataForStats(statisticsType, elementIds || ''));
  }
  protected downloadCurrentElementStats(statisticsType: string, tokenId: string) {
    this.telegramService.sendData(this.getDataForStats(statisticsType, tokenId));
  }

  protected getBotId(){
    return localStorage.getItem('botid') || '';
  }

  protected getAdminId(){
    return localStorage.getItem('user_id') || '';
  }

  protected getDataForStats(statisticsType: string, elementId: string){
    return {
      typeStatistics: statisticsType,
      botId: this.getBotId(),
      userId: this.getAdminId(),
      elementsId: elementId.toString()
    }
  }
}
