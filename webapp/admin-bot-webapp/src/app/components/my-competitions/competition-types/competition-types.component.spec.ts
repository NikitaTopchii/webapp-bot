import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionTypesComponent } from './competition-types.component';

describe('CompetitionTypesComponent', () => {
  let component: CompetitionTypesComponent;
  let fixture: ComponentFixture<CompetitionTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompetitionTypesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompetitionTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
