import { Component } from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-competitions-list-page',
  standalone: true,
    imports: [
        NgForOf,
        NgIf
    ],
  templateUrl: './competitions-list-page.component.html',
  styleUrl: './competitions-list-page.component.scss'
})
export class CompetitionsListPageComponent {

}
