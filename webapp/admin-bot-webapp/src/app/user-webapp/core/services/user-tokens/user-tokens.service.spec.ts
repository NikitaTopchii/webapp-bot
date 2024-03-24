import { TestBed } from '@angular/core/testing';

import { UserTokensService } from './user-tokens.service';

describe('UserTokensService', () => {
  let service: UserTokensService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserTokensService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
