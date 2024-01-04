import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionEndpointSelectorComponent } from './competition-endpoint-selector.component';

describe('CompetitionEndpointSelectorComponent', () => {
  let component: CompetitionEndpointSelectorComponent;
  let fixture: ComponentFixture<CompetitionEndpointSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompetitionEndpointSelectorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompetitionEndpointSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
