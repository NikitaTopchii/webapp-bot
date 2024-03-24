import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTokensSelectorComponent } from './user-tokens-selector.component';

describe('UserTokensSelectorComponent', () => {
  let component: UserTokensSelectorComponent;
  let fixture: ComponentFixture<UserTokensSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserTokensSelectorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserTokensSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
