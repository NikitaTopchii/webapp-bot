import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminWebappComponent } from './admin-webapp.component';

describe('AdminWebappComponent', () => {
  let component: AdminWebappComponent;
  let fixture: ComponentFixture<AdminWebappComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminWebappComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminWebappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
