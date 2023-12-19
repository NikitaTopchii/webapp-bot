import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatsListPageComponent } from './chats-list-page.component';

describe('ChatsListPageComponent', () => {
  let component: ChatsListPageComponent;
  let fixture: ComponentFixture<ChatsListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatsListPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChatsListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
