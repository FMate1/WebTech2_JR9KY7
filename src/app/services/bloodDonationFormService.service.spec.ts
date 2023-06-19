import { TestBed } from '@angular/core/testing';

import { BloodDonationFormService } from './bloodDonationFormService.service';

describe('BloodDonationFormService', () => {
  let service: BloodDonationFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BloodDonationFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
