import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipationWithConditionsComponent } from './participation-with-conditions.component';

describe('ParticipationWithConditionsComponent', () => {
  let component: ParticipationWithConditionsComponent;
  let fixture: ComponentFixture<ParticipationWithConditionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParticipationWithConditionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ParticipationWithConditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
