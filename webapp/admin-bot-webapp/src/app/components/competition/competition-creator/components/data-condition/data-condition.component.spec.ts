import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataConditionComponent } from './data-condition.component';

describe('DataConditionComponent', () => {
  let component: DataConditionComponent;
  let fixture: ComponentFixture<DataConditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataConditionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
