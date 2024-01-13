import { Component } from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-competition-types-list',
  standalone: true,
    imports: [
        NgForOf,
        NgIf
    ],
  templateUrl: './competition-types-list.component.html',
  styleUrl: './competition-types-list.component.scss'
})
export class CompetitionTypesListComponent {

}
