import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ChatGuardService} from "../../core/services/chatguard/chat-guard.service";

@Component({
  selector: 'app-stop-words-list',
  templateUrl: './stop-words-list.component.html',
  styleUrl: './stop-words-list.component.scss'
})
export class StopWordsListComponent implements OnInit{

  private stopWordsList: string[] = [];
  private chatId: string = '';

  constructor(private router: ActivatedRoute, private chatGuardService: ChatGuardService) {
  }

  ngOnInit() {
    this.router.paramMap.subscribe(params => {
      this.chatId = params.get('id') || '';
      console.log('chat id: ' + this.chatId)
    });

    this.setStopWordsList();
  }

  getStopWordsList(){
    return this.stopWordsList;
  }

  setStopWordsList(){
    this.chatGuardService.getStopWordsByChatId(this.chatId).subscribe((array: any) => {
      this.stopWordsList = array;
    })
  }
}
