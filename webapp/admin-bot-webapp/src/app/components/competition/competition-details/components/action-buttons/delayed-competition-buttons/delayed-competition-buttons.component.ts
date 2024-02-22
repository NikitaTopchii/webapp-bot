import {Component, EventEmitter, Output} from '@angular/core';

type actionType = 'PUBLISH' | 'EDIT' | 'DELETE'

@Component({
  selector: 'app-delayed-competition-buttons',
  templateUrl: './delayed-competition-buttons.component.html',
  styleUrl: './delayed-competition-buttons.component.scss'
})
export class DelayedCompetitionButtonsComponent {
  @Output() customEvent: EventEmitter<actionType> = new EventEmitter<actionType>();

}
