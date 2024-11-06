import { TestBed } from '@angular/core/testing';

import { PartiesInvolvedService } from './parties-involved.service';

describe('PartiesInvolvedService', () => {
  let service: PartiesInvolvedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PartiesInvolvedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
