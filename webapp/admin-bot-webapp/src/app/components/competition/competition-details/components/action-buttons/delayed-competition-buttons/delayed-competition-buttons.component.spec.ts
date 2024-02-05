import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelayedCompetitionButtonsComponent } from './delayed-competition-buttons.component';

describe('DelayedCompetitionButtonsComponent', () => {
  let component: DelayedCompetitionButtonsComponent;
  let fixture: ComponentFixture<DelayedCompetitionButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DelayedCompetitionButtonsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DelayedCompetitionButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
