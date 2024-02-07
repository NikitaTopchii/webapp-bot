import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateTimeValidatorService {

  constructor() { }

  isFailDateFormatState(finishDate: string){
    if(finishDate.includes('/')){
      const dataByArray = finishDate.split('/');

      let day = parseInt(dataByArray[0]);

      let month = parseInt(dataByArray[1]);

      return (day > 0 && day <= 31) && (month > 0 && month <= 12);
    }else{
      return false;
    }
  }

  checkDateValidation(date: string, expTime: string){
    if(this.isFailTimeFormatState(expTime)){
      return this.convertToISOFormat(date, expTime);
    }else{
      return '';
    }
  }

  isFailTimeFormatState(finishTime: string) {
    if(finishTime.includes(':')){
      const timeByArray = finishTime.split(':');

      let hour = parseInt(timeByArray[0]);

      let minute = parseInt(timeByArray[1]);

      return (hour >= 0 && hour <= 23) && (minute >= 0 && minute <= 59);
    }else{
      return false;
    }
  }

  convertToISOFormat(dateString:string, timeString:string) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}T${timeString}:00.000Z`;
  }

  getCurrentTime() {
    const now = new Date();

    return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  }
}
