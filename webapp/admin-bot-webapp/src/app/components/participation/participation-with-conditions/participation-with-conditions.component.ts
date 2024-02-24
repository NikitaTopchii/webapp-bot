import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormArray, Validators, FormControl} from '@angular/forms';
import {ParticipationService} from "../../core/services/participation/participation.service";

@Component({
  selector: 'app-participation-with-conditions',
  templateUrl: './participation-with-conditions.component.html',
  styleUrl: './participation-with-conditions.component.scss'
})
export class ParticipationWithConditionsComponent{

  contestData: any;
  usersForm: FormGroup;
  constructor(private fb: FormBuilder, private participationService: ParticipationService) {
    this.usersForm = this.fb.group({
      users: this.fb.array([])
    })
  }
  get users() {
    return this.usersForm.get('users') as FormArray;
  }

  addUser(data: any) {
    const user = this.fb.group({
      label: [data.label],
      answer: ['', Validators.required]
    });
    this.users.push(user);
    console.log(this.users.value);
  }

  ngOnInit() {
    this.participationService.getCompetitionConditionSubject().subscribe((data) => {
      this.contestData = JSON.parse(data.contestData.conditions);

      this.contestData.otherConditions.forEach((condition: any) => {
        console.log(condition)
        this.addUser(condition);
      })
    })
  }

  participate() {
    console.log(this.usersForm.value);
  }
}
