import { TestBed } from '@angular/core/testing';

import { ApicartService } from './apicart.service';

describe('ApicartService', () => {
  let service: ApicartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApicartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
