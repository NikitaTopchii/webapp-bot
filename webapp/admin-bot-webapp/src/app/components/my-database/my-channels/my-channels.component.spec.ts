import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyChannelsComponent } from './my-channels.component';

describe('MyChannelsComponent', () => {
  let component: MyChannelsComponent;
  let fixture: ComponentFixture<MyChannelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyChannelsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyChannelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
