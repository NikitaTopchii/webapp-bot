import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPermissionsComponent } from './admin-permissions.component';

describe('PermissionsComponent', () => {
  let component: AdminPermissionsComponent;
  let fixture: ComponentFixture<AdminPermissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminPermissionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
