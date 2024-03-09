import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatGuardSettingsComponent } from './chat-guard-settings.component';

describe('ChatGuardSettingsComponent', () => {
  let component: ChatGuardSettingsComponent;
  let fixture: ComponentFixture<ChatGuardSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatGuardSettingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChatGuardSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
