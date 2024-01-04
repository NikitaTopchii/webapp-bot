import { TestBed } from '@angular/core/testing';

import { SelectedChannelsService } from './selected-channels.service';

describe('SelectedChannelsService', () => {
  let service: SelectedChannelsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectedChannelsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
