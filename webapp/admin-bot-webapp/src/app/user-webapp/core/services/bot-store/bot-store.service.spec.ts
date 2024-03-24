import { TestBed } from '@angular/core/testing';

import { BotStoreService } from './bot-store.service';

describe('BotStoreService', () => {
  let service: BotStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BotStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
