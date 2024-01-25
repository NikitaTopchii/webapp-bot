import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-news-letter',
  templateUrl: './news-letter.component.html',
  styleUrl: './news-letter.component.scss'
})
export class NewsLetterComponent {

  constructor(private router: Router) {
  }

  navigateToCompetitionsList() {
    this.router.navigate(['private/channels-with-competitions'])
  }

  navigateToChats() {
    this.router.navigate(['public/chat-selector'])
  }
}
