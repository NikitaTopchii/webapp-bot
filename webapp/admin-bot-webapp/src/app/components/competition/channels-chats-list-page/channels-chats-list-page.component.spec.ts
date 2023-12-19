import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelsChatsListPageComponent } from './channels-chats-list-page.component';

describe('ChannelsChatsListPageComponent', () => {
  let component: ChannelsChatsListPageComponent;
  let fixture: ComponentFixture<ChannelsChatsListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChannelsChatsListPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChannelsChatsListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
