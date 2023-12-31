import { Component } from '@angular/core';
import {NgIf, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-success-creating-competition',
  standalone: true,
    imports: [
        NgIf,
        NgOptimizedImage
    ],
  templateUrl: './success-creating-competition.component.html',
  styleUrl: './success-creating-competition.component.scss'
})
export class SuccessCreatingCompetitionComponent {
  successParticipation = false;

  constructor() {
    this.successParticipation = true;
  }
}
