import {Component, EventEmitter, Output} from '@angular/core';

type actionType = 'WRITE_NEWSLETTER' | 'DOWNLOAD' | 'DELETE'

@Component({
  selector: 'app-finished-competitions-buttons',
  templateUrl: './finished-competitions-buttons.component.html',
  styleUrl: './finished-competitions-buttons.component.scss'
})
export class FinishedCompetitionsButtonsComponent {
  @Output() customEvent: EventEmitter<actionType> = new EventEmitter<actionType>();
}
