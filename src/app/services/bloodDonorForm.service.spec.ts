import { TestBed } from '@angular/core/testing';

import { BloodDonorFormService } from './bloodDonorForm.service';

describe('BloodDonorFormService', () => {
  let service: BloodDonorFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BloodDonorFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
