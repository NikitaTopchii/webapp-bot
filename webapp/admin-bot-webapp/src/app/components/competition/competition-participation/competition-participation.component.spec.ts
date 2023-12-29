import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionParticipationComponent } from './competition-participation.component';

describe('CompetitionParticipationComponent', () => {
  let component: CompetitionParticipationComponent;
  let fixture: ComponentFixture<CompetitionParticipationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompetitionParticipationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompetitionParticipationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
