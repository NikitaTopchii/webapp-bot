import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ChatGuardService} from "../../core/services/chatguard/chat-guard.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TelegramService} from "../../core/services/telegram/telegram.service";
import {ChannelsService} from "../../core/services/channels/channels.service";

@Component({
  selector: 'app-chat-guard-settings',
  templateUrl: './chat-guard-settings.component.html',
  styleUrl: './chat-guard-settings.component.scss'
})
export class ChatGuardSettingsComponent implements OnInit{
  chatSecurityForm: FormGroup;
  private chatId: string = '';
  constructor(private readonly fb: FormBuilder,
              private chatGuardService: ChatGuardService,
              private chatService: ChannelsService,
              private router: ActivatedRoute,
              private route: Router,
              private telegramService: TelegramService) {

    this.router.paramMap.subscribe(params => {
      this.chatId = params.get('id') || '';
      console.log(this.chatId)
    });

    this.chatSecurityForm = this.getChatSecurityForm();

    this.chatSecurityForm.valueChanges.subscribe(() => {
      const chatSecurityStatus = this.chatSecurityForm.get('chatSecurityStatus')?.value ? '1' : '0';
      const chatStopWordStatus = this.chatSecurityForm.get('chatStopWordStatus')?.value ? '1' : '0';
      const chatCaptchaStatus = this.chatSecurityForm.get('chatCaptchaStatus')?.value ? '1' : '0';
      const chatCommandStatus = this.chatSecurityForm.get('chatCommandStatus')?.value ? '1' : '0';
      const chatGamificationStatus = this.chatSecurityForm.get('chatGamificationStatus')?.value ? '1' : '0';

      this.updateChatSecurityStatus(chatSecurityStatus);
      this.updateChatCaptchaStatus(chatCaptchaStatus);
      this.updateChatCommandStatus(chatCommandStatus);
      this.updateChatStopWordStatus(chatStopWordStatus);
      this.updateChatGamificationStatus(chatGamificationStatus);
      this.goBack = this.goBack.bind(this);
    })
  }

  ngOnInit() {
    this.telegramService.BackButton.show();
    this.telegramService.BackButton.onClick(this.goBack);
  }

  goBack(){
    this.route.navigate(['/chatguard/chat-selector']);
  }

  ngOnDestroy(): void {
    this.telegramService.BackButton.offClick(this.goBack);
  }

  updateChatSecurityStatus(chatSecurityStatus: string){
    this.chatGuardService.setChatSecurityStatus(chatSecurityStatus, this.chatId).subscribe();
  }

  updateChatStopWordStatus(chatStopWordStatus: string){
    this.chatGuardService.setChatStopWordsStatus(chatStopWordStatus, this.chatId).subscribe();
  }

  updateChatCaptchaStatus(chatCaptchaStatus: string){
    this.chatGuardService.setChatCaptchaStatus(chatCaptchaStatus, this.chatId).subscribe();
  }

  updateChatCommandStatus(chatCommandStatus: string){
    this.chatGuardService.setChatCommandStatus(chatCommandStatus, this.chatId).subscribe();
  }

  updateChatGamificationStatus(chatGamificationStatus: string){
    this.chatGuardService.setChatGamificationStatus(chatGamificationStatus, this.chatId).subscribe();
  }

  getChatSecurityForm(){
    return this.fb.group({
      chatSecurityStatus: [false],
      chatStopWordStatus: [false],
      chatCaptchaStatus: [false],
      chatCommandStatus: [false],
      chatGamificationStatus: [false]
    })
  }

  getCurrentChatInfo(){
    //this.chatService.getChannelsByChatIds()
  }

  navigateToStopWordsList() {
    this.route.navigate(['/chatguard/stop-words-list', this.chatId])
  }
}
