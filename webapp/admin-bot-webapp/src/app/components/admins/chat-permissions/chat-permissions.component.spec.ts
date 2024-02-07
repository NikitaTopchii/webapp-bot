import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatPermissionsComponent } from './chat-permissions.component';

describe('ChatPermissionsComponent', () => {
  let component: ChatPermissionsComponent;
  let fixture: ComponentFixture<ChatPermissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatPermissionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChatPermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
