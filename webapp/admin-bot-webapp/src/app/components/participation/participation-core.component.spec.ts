import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipationCoreComponent } from './participation-core.component';

describe('ParticipationCoreComponent', () => {
  let component: ParticipationCoreComponent;
  let fixture: ComponentFixture<ParticipationCoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParticipationCoreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ParticipationCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
