import {Component, inject} from '@angular/core';
import {Router} from "@angular/router";
import {TelegramService} from "../../core/services/telegram/telegram.service";
import {LanguageSelectorComponent} from "../../language-selector/language-selector.component";
import {UserService} from "../../core/services/user/user.service";

@Component({
  selector: 'app-main-admin-page',
  standalone: true,
  imports: [
    LanguageSelectorComponent
  ],
  templateUrl: './main-admin-page.component.html',
  styleUrl: './main-admin-page.component.scss'
})
export class MainAdminPageComponent {

  telegram = inject(TelegramService);
  userService = inject(UserService);

  data: any;
  constructor(private router: Router) {
    this.data = this.telegram.UserData.id;

    const formData = new FormData();

    formData.append('id', this.data);

    this.userService.signIn(formData)
    this.telegram.BackButton.hide();
  }

  navigateToAdminsList() {
    this.router.navigate(['/admins-list'])
  }

  navigateToChannelsList() {
    this.router.navigate(['/channels-list'])
  }

  navigateToChatsList() {
    this.router.navigate(['/chats-list'])
  }

  navigateToCompetitionCreator() {
    this.router.navigate(['/channels-list'])
  }
}
