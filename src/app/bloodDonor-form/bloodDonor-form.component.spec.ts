import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodDonorFormComponent } from './bloodDonor-form.component';

describe('BloodDonorFormComponent', () => {
  let component: BloodDonorFormComponent;
  let fixture: ComponentFixture<BloodDonorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BloodDonorFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BloodDonorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
