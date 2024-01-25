import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribeParticipationComponent } from './subscribe-participation.component';

describe('CompetitionParticipationComponent', () => {
  let component: SubscribeParticipationComponent;
  let fixture: ComponentFixture<SubscribeParticipationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscribeParticipationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscribeParticipationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
