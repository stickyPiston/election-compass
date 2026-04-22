import { TestBed } from '@angular/core/testing';

import { Localisation } from './localisation';

describe('Localisation', () => {
  let service: Localisation;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Localisation);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
