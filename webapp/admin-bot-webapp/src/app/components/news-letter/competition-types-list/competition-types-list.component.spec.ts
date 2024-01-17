import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionTypesListComponent } from './competition-types-list.component';

describe('CompetitionTypesListComponent', () => {
  let component: CompetitionTypesListComponent;
  let fixture: ComponentFixture<CompetitionTypesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompetitionTypesListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompetitionTypesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
