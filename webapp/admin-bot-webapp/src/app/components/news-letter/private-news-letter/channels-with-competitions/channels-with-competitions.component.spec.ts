import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelsWithCompetitionsComponent } from './channels-with-competitions.component';

describe('ChennelsWithCompetitionsComponent', () => {
  let component: ChannelsWithCompetitionsComponent;
  let fixture: ComponentFixture<ChannelsWithCompetitionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChannelsWithCompetitionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChannelsWithCompetitionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
