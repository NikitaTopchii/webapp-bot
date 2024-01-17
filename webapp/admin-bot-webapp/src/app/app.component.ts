import {Component, inject} from '@angular/core';
import {TelegramService} from "./components/core/services/telegram/telegram.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'admin-bot-webapp';

  telegram = inject(TelegramService);

  constructor() {
    console.log('MyService is injected', this.telegram);
    this.telegram.ready();
  }
}
