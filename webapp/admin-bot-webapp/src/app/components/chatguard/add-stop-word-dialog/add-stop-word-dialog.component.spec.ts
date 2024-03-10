import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStopWordDialogComponent } from './add-stop-word-dialog.component';

describe('AddStopWordDialogComponent', () => {
  let component: AddStopWordDialogComponent;
  let fixture: ComponentFixture<AddStopWordDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddStopWordDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddStopWordDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
