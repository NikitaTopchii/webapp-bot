import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionCreatorComponent } from './competition-creator.component';

describe('CompetitionCreatorComponent', () => {
  let component: CompetitionCreatorComponent;
  let fixture: ComponentFixture<CompetitionCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompetitionCreatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompetitionCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
