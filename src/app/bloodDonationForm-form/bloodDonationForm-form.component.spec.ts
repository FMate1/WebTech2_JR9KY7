import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodDonationFormComponent } from './bloodDonationForm-form.component';

describe('BloodDonationFormComponent', () => {
  let component: BloodDonationFormComponent;
  let fixture: ComponentFixture<BloodDonationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BloodDonationFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BloodDonationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
