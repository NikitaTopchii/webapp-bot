import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  constructor(private http: HttpClient) {}

  setLanguage(lang: string): void {
    this.http.get(`/api/language/${lang}`).subscribe((result) => {
      // Зберігання обраної мови
      localStorage.setItem('preferredLanguage', lang);

      // Перенаправлення на відповідну локалізовану сторінку
      window.location.href = `/${lang}`;
    });
  }
}
