import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishedCompetitionsListComponent } from './finished-competitions-list.component';

describe('FinishedCompetitionsListComponent', () => {
  let component: FinishedCompetitionsListComponent;
  let fixture: ComponentFixture<FinishedCompetitionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinishedCompetitionsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FinishedCompetitionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
