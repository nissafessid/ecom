import { TestBed } from '@angular/core/testing';

import { ApicontactService } from './apicontact.service';

describe('ApicontactService', () => {
  let service: ApicontactService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApicontactService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
