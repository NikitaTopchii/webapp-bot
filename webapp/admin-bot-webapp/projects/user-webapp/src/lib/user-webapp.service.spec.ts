import { TestBed } from '@angular/core/testing';

import { UserWebappService } from './user-webapp.service';

describe('UserWebappService', () => {
  let service: UserWebappService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserWebappService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
