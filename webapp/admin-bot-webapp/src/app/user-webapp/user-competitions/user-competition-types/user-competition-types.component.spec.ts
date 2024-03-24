import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCompetitionTypesComponent } from './user-competition-types.component';

describe('UserCompetitionTypesComponent', () => {
  let component: UserCompetitionTypesComponent;
  let fixture: ComponentFixture<UserCompetitionTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCompetitionTypesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserCompetitionTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
