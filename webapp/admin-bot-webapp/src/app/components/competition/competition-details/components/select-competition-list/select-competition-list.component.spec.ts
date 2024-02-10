import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCompetitionListComponent } from './select-competition-list.component';

describe('SelectCompetitionListComponent', () => {
  let component: SelectCompetitionListComponent;
  let fixture: ComponentFixture<SelectCompetitionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectCompetitionListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectCompetitionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
