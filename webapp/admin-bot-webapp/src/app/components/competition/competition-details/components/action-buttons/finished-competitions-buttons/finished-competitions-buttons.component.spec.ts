import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishedCompetitionsButtonsComponent } from './finished-competitions-buttons.component';

describe('FinishedCompetitionsButtonsComponent', () => {
  let component: FinishedCompetitionsButtonsComponent;
  let fixture: ComponentFixture<FinishedCompetitionsButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinishedCompetitionsButtonsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FinishedCompetitionsButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
