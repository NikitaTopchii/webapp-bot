import { TestBed } from '@angular/core/testing';

import { ChatTokenService } from './chat-token.service';

describe('ChatTokenService', () => {
  let service: ChatTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
