import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveCompetitionButtonsComponent } from './active-competition-buttons.component';

describe('ActiveCompetitionButtonsComponent', () => {
  let component: ActiveCompetitionButtonsComponent;
  let fixture: ComponentFixture<ActiveCompetitionButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActiveCompetitionButtonsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActiveCompetitionButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
