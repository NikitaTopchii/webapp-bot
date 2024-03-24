import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishedUserCompetitionComponent } from './finished-user-competition.component';

describe('FinishedUserCompetitionComponent', () => {
  let component: FinishedUserCompetitionComponent;
  let fixture: ComponentFixture<FinishedUserCompetitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinishedUserCompetitionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FinishedUserCompetitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
