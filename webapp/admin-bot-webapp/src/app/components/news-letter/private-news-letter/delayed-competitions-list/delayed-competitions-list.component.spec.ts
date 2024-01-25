import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelayedCompetitionsListComponent } from './delayed-competitions-list.component';

describe('DelayedCompetitionsListComponent', () => {
  let component: DelayedCompetitionsListComponent;
  let fixture: ComponentFixture<DelayedCompetitionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DelayedCompetitionsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DelayedCompetitionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
