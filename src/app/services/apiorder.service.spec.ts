import { TestBed } from '@angular/core/testing';

import { ApiorderService } from './apiorder.service';

describe('ApiorderService', () => {
  let service: ApiorderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiorderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
