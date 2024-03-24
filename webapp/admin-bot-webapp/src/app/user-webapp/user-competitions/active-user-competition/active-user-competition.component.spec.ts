import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveUserCompetitionComponent } from './active-user-competition.component';

describe('ActiveUserCompetitionComponent', () => {
  let component: ActiveUserCompetitionComponent;
  let fixture: ComponentFixture<ActiveUserCompetitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActiveUserCompetitionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActiveUserCompetitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
