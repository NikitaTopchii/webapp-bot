import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatSelectorDialogComponent } from './chat-selector-dialog.component';

describe('ChatSelectorDialogComponent', () => {
  let component: ChatSelectorDialogComponent;
  let fixture: ComponentFixture<ChatSelectorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatSelectorDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChatSelectorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
