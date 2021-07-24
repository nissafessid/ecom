import { TestBed } from '@angular/core/testing';

import { FavorisprodService } from './favorisprod.service';

describe('FavorisprodService', () => {
  let service: FavorisprodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavorisprodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
