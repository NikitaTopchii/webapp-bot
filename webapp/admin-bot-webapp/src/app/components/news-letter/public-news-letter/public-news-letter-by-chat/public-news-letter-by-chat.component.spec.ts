import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicNewsLetterByChatComponent } from './public-news-letter-by-chat.component';

describe('PublicNewsLetterByChatComponent', () => {
  let component: PublicNewsLetterByChatComponent;
  let fixture: ComponentFixture<PublicNewsLetterByChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicNewsLetterByChatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PublicNewsLetterByChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
