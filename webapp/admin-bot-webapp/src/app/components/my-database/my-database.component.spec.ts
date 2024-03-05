import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDatabaseComponent } from './my-database.component';

describe('MyDatabaseComponent', () => {
  let component: MyDatabaseComponent;
  let fixture: ComponentFixture<MyDatabaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyDatabaseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
