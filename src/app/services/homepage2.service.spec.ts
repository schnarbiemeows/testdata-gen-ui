import { TestBed } from '@angular/core/testing';

import { Homepage2Service } from './homepage2.service';

describe('Homepage2Service', () => {
  let service: Homepage2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Homepage2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
