import {Component, EventEmitter, Output} from '@angular/core';

type actionType = 'EDIT' | 'DELETE'

@Component({
  selector: 'app-draft-competitions-buttons',
  templateUrl: './draft-competitions-buttons.component.html',
  styleUrl: './draft-competitions-buttons.component.scss'
})
export class DraftCompetitionsButtonsComponent {
  @Output() customEvent: EventEmitter<actionType> = new EventEmitter<actionType>();
}
