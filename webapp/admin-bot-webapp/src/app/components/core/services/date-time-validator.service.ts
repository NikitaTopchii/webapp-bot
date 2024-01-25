import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateTimeValidatorService {

  constructor() { }

  isFailDateFormatState(finishDate: string){
    console.log(finishDate)
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

  convertToISOFormat(dateString: string, expirationTimeString: string): string {
    // Створюємо об'єкт Date із вхідного рядка дати
    let date = new Date(dateString);

    // Розбиваємо рядок часу закінчення на компоненти (години, хвилини)
    const timeComponents = expirationTimeString.split(':');
    if (timeComponents.length !== 2) {
      throw new Error("Invalid expiration time format");
    }

    // Додаємо час закінчення до об'єкта дати
    date.setHours(parseInt(timeComponents[0]), parseInt(timeComponents[1]));

    console.log('DATE BEFORE' + date)

    // Коригуємо час з урахуванням часового поясу, щоб отримати час у форматі UTC
    const timezoneOffset = localStorage.getItem('timezone');
    console.log(timezoneOffset)
    if(timezoneOffset !== null){
      console.log(timezoneOffset)
      date.setHours(date.getHours() + parseInt(timezoneOffset));
    }

    console.log('DATE AFTER' + date)

    // Повертаємо дату у форматі ISO
    console.log(date.toISOString())
    return date.toISOString();
  }

  getCurrentTime() {
    const now = new Date();

    const timezoneOffset = localStorage.getItem('timezone');

    if(timezoneOffset){
      now.setHours(now.getHours());
    }

    return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  }
}
