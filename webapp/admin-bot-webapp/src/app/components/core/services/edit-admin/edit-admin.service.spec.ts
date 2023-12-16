import { TestBed } from '@angular/core/testing';

import { EditAdminService } from './edit-admin.service';

describe('EditAdminService', () => {
  let service: EditAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
