import { TestBed } from '@angular/core/testing';

import { AddNewAdminService } from './add-new-admin.service';

describe('AddNewAdminService', () => {
  let service: AddNewAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddNewAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
