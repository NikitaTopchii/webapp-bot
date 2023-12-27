import { TestBed } from '@angular/core/testing';

import { CreateCompetitionService } from './create-competition.service';

describe('CreateCompetitionService', () => {
  let service: CreateCompetitionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateCompetitionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
