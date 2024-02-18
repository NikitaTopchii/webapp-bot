import {Component, EventEmitter, Output} from '@angular/core';

type actionType = 'SHOW_INFO' | 'PUBLISH' | 'EDIT' | 'DELETE'

@Component({
  selector: 'app-delayed-competition-buttons',
  templateUrl: './delayed-competition-buttons.component.html',
  styleUrl: './delayed-competition-buttons.component.scss'
})
export class DelayedCompetitionButtonsComponent {
  @Output() customEvent: EventEmitter<actionType> = new EventEmitter<actionType>();

}
