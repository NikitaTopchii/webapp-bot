import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseWebappComponent } from './base-webapp.component';

describe('BaseWebappComponent', () => {
  let component: BaseWebappComponent;
  let fixture: ComponentFixture<BaseWebappComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseWebappComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BaseWebappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
