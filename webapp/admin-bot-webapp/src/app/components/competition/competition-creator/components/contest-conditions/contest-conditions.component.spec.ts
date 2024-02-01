import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestConditionsComponent } from './contest-conditions.component';

describe('ContestConditionsComponent', () => {
  let component: ContestConditionsComponent;
  let fixture: ComponentFixture<ContestConditionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContestConditionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContestConditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
