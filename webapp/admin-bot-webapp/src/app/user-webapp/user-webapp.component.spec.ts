import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserWebappComponent } from './user-webapp.component';

describe('UserWebappComponent', () => {
  let component: UserWebappComponent;
  let fixture: ComponentFixture<UserWebappComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserWebappComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserWebappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
