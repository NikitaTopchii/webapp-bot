import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateNewsLetterByCompetitionComponent } from './private-news-letter-by-competition.component';

describe('PrivateNewsLetterByCompetitionComponent', () => {
  let component: PrivateNewsLetterByCompetitionComponent;
  let fixture: ComponentFixture<PrivateNewsLetterByCompetitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivateNewsLetterByCompetitionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrivateNewsLetterByCompetitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
