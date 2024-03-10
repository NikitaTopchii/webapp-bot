import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StopWordsListComponent } from './stop-words-list.component';

describe('StopWordsListComponent', () => {
  let component: StopWordsListComponent;
  let fixture: ComponentFixture<StopWordsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StopWordsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StopWordsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
