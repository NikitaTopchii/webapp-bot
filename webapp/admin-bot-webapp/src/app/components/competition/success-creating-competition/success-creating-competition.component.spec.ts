import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessCreatingCompetitionComponent } from './success-creating-competition.component';

describe('SuccessCreatingCompetitionComponent', () => {
  let component: SuccessCreatingCompetitionComponent;
  let fixture: ComponentFixture<SuccessCreatingCompetitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuccessCreatingCompetitionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuccessCreatingCompetitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
