import { TestBed } from '@angular/core/testing';

import { UserCompetitionsService } from './user-competitions.service';

describe('UserCompetitionsService', () => {
  let service: UserCompetitionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserCompetitionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
