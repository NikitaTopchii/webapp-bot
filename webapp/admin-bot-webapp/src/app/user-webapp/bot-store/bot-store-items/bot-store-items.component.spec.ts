import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotStoreItemsComponent } from './bot-store-items.component';

describe('BotStoreItemsComponent', () => {
  let component: BotStoreItemsComponent;
  let fixture: ComponentFixture<BotStoreItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotStoreItemsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BotStoreItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
