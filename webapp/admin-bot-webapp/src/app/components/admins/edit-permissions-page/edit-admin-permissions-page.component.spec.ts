import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAdminPermissionsPageComponent } from './edit-admin-permissions-page.component';

describe('EditPermissionsPageComponent', () => {
  let component: EditAdminPermissionsPageComponent;
  let fixture: ComponentFixture<EditAdminPermissionsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditAdminPermissionsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAdminPermissionsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
