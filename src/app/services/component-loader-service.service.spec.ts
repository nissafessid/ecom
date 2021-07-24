import { TestBed } from '@angular/core/testing';

import { ComponentLoaderServiceService } from './component-loader-service.service';

describe('ComponentLoaderServiceService', () => {
  let service: ComponentLoaderServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComponentLoaderServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
