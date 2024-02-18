import {Component, EventEmitter, Output} from '@angular/core';

type actionType = 'SHOW_INFO' | 'WRITE_NEWSLETTER' | 'FINISH_COMPETITION'

@Component({
  selector: 'app-active-competition-buttons',
  templateUrl: './active-competition-buttons.component.html',
  styleUrl: './active-competition-buttons.component.scss'
})
export class ActiveCompetitionButtonsComponent {
  @Output() customEvent: EventEmitter<actionType> = new EventEmitter<actionType>();
}
