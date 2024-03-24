import { Component } from '@angular/core';
import {LanguageService} from "../core/services/language/language.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrl: './language-selector.component.scss'
})
export class LanguageSelectorComponent {
  selectedLanguage: string = 'en'; // Default language
  constructor(private languageService: LanguageService) {}
  changeLanguage() {
    this.languageService.setLanguage(this.selectedLanguage);
  }
}
