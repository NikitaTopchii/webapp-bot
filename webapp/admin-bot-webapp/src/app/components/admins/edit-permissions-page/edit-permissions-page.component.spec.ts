import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPermissionsPageComponent } from './edit-permissions-page.component';

describe('EditPermissionsPageComponent', () => {
  let component: EditPermissionsPageComponent;
  let fixture: ComponentFixture<EditPermissionsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditPermissionsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditPermissionsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
