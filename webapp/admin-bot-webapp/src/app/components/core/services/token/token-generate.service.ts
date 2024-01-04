import { Injectable } from '@angular/core';
import CryptoJS from 'crypto-js';
@Injectable({
  providedIn: 'root'
})
export class TokenGenerateService {
  constructor() { }

  generateSHA256Token(): number {
    // return CryptoJS.SHA512(this.generateRandomString(2)).toString();
    return Math.floor(Math.random() * 100000000);
  }

  generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charactersLength);
      result += characters.charAt(randomIndex);
    }
    return result;
  }
}
