import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadonlyCompetitionDetailsComponent } from './readonly-competition-details.component';

describe('ReadonlyCompetitionDetailsComponent', () => {
  let component: ReadonlyCompetitionDetailsComponent;
  let fixture: ComponentFixture<ReadonlyCompetitionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReadonlyCompetitionDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReadonlyCompetitionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
