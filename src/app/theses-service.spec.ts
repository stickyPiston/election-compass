import { TestBed } from '@angular/core/testing';

import { ThesesService } from './theses-service';

describe('ThesesService', () => {
  let service: ThesesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThesesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
