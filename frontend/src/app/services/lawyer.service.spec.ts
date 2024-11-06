import { TestBed } from '@angular/core/testing';

import { LawyerService } from './lawyer.service';

describe('LawyerService', () => {
  let service: LawyerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LawyerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
