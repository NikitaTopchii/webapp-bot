import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveCompetitionsListComponent } from './active-competitions-list.component';

describe('ActiveCompetitionsListComponent', () => {
  let component: ActiveCompetitionsListComponent;
  let fixture: ComponentFixture<ActiveCompetitionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActiveCompetitionsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActiveCompetitionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
