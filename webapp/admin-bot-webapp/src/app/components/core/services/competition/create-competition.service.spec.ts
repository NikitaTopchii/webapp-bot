import { TestBed } from '@angular/core/testing';

import { CompetitionService } from './competition.service';

describe('CreateCompetitionService', () => {
  let service: CompetitionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompetitionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
