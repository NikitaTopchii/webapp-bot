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
  chatSecurityForm: FormGroup = this.fb.group({
    chatSecurityStatus: [false],
    chatStopWordStatus: [false],
    chatCaptchaStatus: [false],
    chatCommandStatus: [false],
    chatGamificationStatus: [false]
  })
  private chatId: string = '';
  constructor(private readonly fb: FormBuilder,
              private chatGuardService: ChatGuardService,
              private chatService: ChannelsService,
              private router: ActivatedRoute,
              private route: Router,
              private telegramService: TelegramService) {
    this.goBack = this.goBack.bind(this);

    this.router.paramMap.subscribe(params => {
      this.chatId = params.get('id') || '';
      console.log(this.chatId)
    });

    this.getCurrentChatInfo().subscribe((chatStatus) => {
      this.chatSecurityForm = this.getChatSecurityForm(chatStatus);

      this.setChangesEventsOnForm(this.chatSecurityForm);
    });
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

  getChatSecurityForm(chatStatus: any){
    return this.fb.group({
      chatSecurityStatus: [chatStatus.chatSecurityStatus],
      chatStopWordStatus: [chatStatus.chatStopWordStatus],
      chatCaptchaStatus: [chatStatus.chatCaptchaStatus],
      chatCommandStatus: [chatStatus.chatCommandStatus],
      chatGamificationStatus: [chatStatus.chatGamificationStatus]
    })
  }

  setChangesEventsOnForm(form: FormGroup){
    form.get('chatSecurityStatus')?.valueChanges.subscribe(() => {
      this.updateChatSecurityStatus(this.getFormElementStatus(this.chatSecurityForm.get('chatSecurityStatus')?.value));
    })
    form.get('chatStopWordStatus')?.valueChanges.subscribe(() => {
      this.updateChatStopWordStatus(this.getFormElementStatus(this.chatSecurityForm.get('chatStopWordStatus')?.value));
    })
    form.get('chatCaptchaStatus')?.valueChanges.subscribe(() => {
      this.updateChatCaptchaStatus(this.getFormElementStatus(this.chatSecurityForm.get('chatCaptchaStatus')?.value));
    })
    form.get('chatCommandStatus')?.valueChanges.subscribe(() => {
      this.updateChatCommandStatus(this.getFormElementStatus(this.chatSecurityForm.get('chatCommandStatus')?.value));
    })
    form.get('chatGamificationStatus')?.valueChanges.subscribe(() => {
      this.updateChatGamificationStatus(this.getFormElementStatus(this.chatSecurityForm.get('chatGamificationStatus')?.value));
    })
  }

  getFormElementStatus(element: boolean){
    return element ? '1' : '0';
  }

  getCurrentChatInfo(){
    return this.chatService.getChannelsByChatId(this.chatId);
  }

  navigateToStopWordsList() {
    this.route.navigate(['/chatguard/stop-words-list', this.chatId])
  }

  clearCurrentChat() {
    this.telegramService.sendData({action: 'CHATCLEANER', chat: parseInt(this.chatId) })
  }
}
