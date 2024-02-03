import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChatForAdminComponent } from './add-chat-for-admin.component';

describe('AddChatForAdminComponent', () => {
  let component: AddChatForAdminComponent;
  let fixture: ComponentFixture<AddChatForAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddChatForAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddChatForAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
