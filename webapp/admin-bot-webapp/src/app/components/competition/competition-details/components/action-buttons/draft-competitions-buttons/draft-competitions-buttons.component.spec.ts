import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftCompetitionsButtonsComponent } from './draft-competitions-buttons.component';

describe('DraftCompetitionsButtonsComponent', () => {
  let component: DraftCompetitionsButtonsComponent;
  let fixture: ComponentFixture<DraftCompetitionsButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DraftCompetitionsButtonsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DraftCompetitionsButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
