import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ChatGuardService} from "../../core/services/chatguard/chat-guard.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../chat-token/confirm-dialog/confirm-dialog.component";
import {AddStopWordDialogComponent} from "../add-stop-word-dialog/add-stop-word-dialog.component";

interface StopWord{
  word: string,
  selected: boolean
}
@Component({
  selector: 'app-stop-words-list',
  templateUrl: './stop-words-list.component.html',
  styleUrl: './stop-words-list.component.scss'
})
export class StopWordsListComponent implements OnInit{

  private stopWordsList: StopWord[] = [];
  private chatId: string = '';

  private selectedStopWords = new Set<string>();

  constructor(private router: ActivatedRoute, private chatGuardService: ChatGuardService, public matDialog: MatDialog) {
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
      console.log(array)
      this.stopWordsList = array;
    })
  }

  selectStopWord(word: StopWord) {
    if(this.selectedStopWords.has(word.word)){
      word.selected = !word.selected;
      this.selectedStopWords.delete(word.word);
    }else{
      word.selected = !word.selected;
      this.selectedStopWords.add(word.word);
    }
  }

  checkSelectedElements(){
    console.log('check selected elements: ' + this.selectedStopWords.size);
    return this.selectedStopWords.size === 0;
  }

  deleteAllStopWords() {
    this.chatGuardService.deleteAllStopWords(this.chatId).subscribe(() => {
      this.setStopWordsList();
    });
  }

  deleteSelectedStopWords(){
    this.chatGuardService.deleteSelectedStopWords(this.selectedStopWords, this.chatId).subscribe(() => {
      this.selectedStopWords.clear();
      this.setStopWordsList();
    })
  }

  addNewStopWord() {
    localStorage.setItem('chatId', this.chatId);

    const dialogConfig = new MatDialogConfig();
    dialogConfig.id = "modal-component";
    dialogConfig.height = "200px";
    dialogConfig.width = "400px";
    dialogConfig.backdropClass = 'back-drop'
    const modalDialog = this.matDialog.open(AddStopWordDialogComponent, dialogConfig);

    modalDialog.afterClosed().subscribe(() => {
      this.setStopWordsList();
    })
  }
}
