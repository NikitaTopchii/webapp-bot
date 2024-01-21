import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatsSelectorComponent } from './chats-selector.component';

describe('ChatsSelectorComponent', () => {
  let component: ChatsSelectorComponent;
  let fixture: ComponentFixture<ChatsSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatsSelectorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChatsSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
