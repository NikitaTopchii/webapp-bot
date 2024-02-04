import { TestBed } from '@angular/core/testing';

import { CompetitionCreatorService } from './competition-creator.service';

describe('CompetitionCreatorService', () => {
  let service: CompetitionCreatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompetitionCreatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
