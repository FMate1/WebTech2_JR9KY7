import { TestBed } from '@angular/core/testing';

import { BloodDonorService } from './bloodDonor.service';

describe('BloodDonorService', () => {
  let service: BloodDonorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BloodDonorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
