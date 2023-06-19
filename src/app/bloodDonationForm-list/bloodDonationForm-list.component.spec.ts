import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodDonationFormListComponent } from './bloodDonationForm-list.component';

describe('BloodDonationFormListComponent', () => {
  let component: BloodDonationFormListComponent;
  let fixture: ComponentFixture<BloodDonationFormListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BloodDonationFormListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BloodDonationFormListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
