import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableCompetitionDetailsComponent } from './editable-competition-details.component';

describe('EditableCompetitionDetailsComponent', () => {
  let component: EditableCompetitionDetailsComponent;
  let fixture: ComponentFixture<EditableCompetitionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditableCompetitionDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditableCompetitionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
