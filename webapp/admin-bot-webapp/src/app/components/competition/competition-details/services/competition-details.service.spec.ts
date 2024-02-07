import { TestBed } from '@angular/core/testing';

import { CompetitionDetailsService } from './competition-details.service';

describe('CompetitionDetailsService', () => {
  let service: CompetitionDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompetitionDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
