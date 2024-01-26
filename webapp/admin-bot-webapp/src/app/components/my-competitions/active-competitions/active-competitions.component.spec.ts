import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveCompetitionsComponent } from './active-competitions.component';

describe('ActiveCompetitionsComponent', () => {
  let component: ActiveCompetitionsComponent;
  let fixture: ComponentFixture<ActiveCompetitionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActiveCompetitionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActiveCompetitionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
