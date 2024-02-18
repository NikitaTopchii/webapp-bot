import {Component, EventEmitter, Output} from '@angular/core';

type pidor = 'EDIT' | 'DELETE'

@Component({
  selector: 'app-draft-competitions-buttons',
  templateUrl: './draft-competitions-buttons.component.html',
  styleUrl: './draft-competitions-buttons.component.scss'
})
export class DraftCompetitionsButtonsComponent {
  @Output() customEvent: EventEmitter<pidor> = new EventEmitter<pidor>();
}
