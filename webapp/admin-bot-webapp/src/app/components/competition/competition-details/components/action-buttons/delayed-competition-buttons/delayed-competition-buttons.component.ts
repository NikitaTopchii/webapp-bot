import {Component, EventEmitter, Output} from '@angular/core';

type pidor = 'SHOW_INFO' | 'PUBLISH' | 'EDIT' | 'DELETE'

@Component({
  selector: 'app-delayed-competition-buttons',
  templateUrl: './delayed-competition-buttons.component.html',
  styleUrl: './delayed-competition-buttons.component.scss'
})
export class DelayedCompetitionButtonsComponent {
  @Output() customEvent: EventEmitter<pidor> = new EventEmitter<pidor>();

}
