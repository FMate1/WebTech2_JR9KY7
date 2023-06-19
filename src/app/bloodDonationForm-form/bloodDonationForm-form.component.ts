import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BloodDonorService } from '../services/bloodDonor.service';
import { LocationDTO, BloodDonorDTO, BloodDonationFormDTO } from 'models';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { BloodDonationFormService } from '../services/bloodDonationFormService.service';
import { LocationService } from '../services/location.service';

@Component({
  selector: 'app-bloodDonationForm-form',
  templateUrl: './bloodDonationForm-form.component.html',
  styleUrls: ['./bloodDonationForm-form.component.css']
})
export class BloodDonationFormComponent implements OnInit {

  isValidBloodDonation = true;
  
  inputIsSuitable = '';
  inputIsDirectedBloodDonation = '';


  bloodDonors: BloodDonorDTO[] = [];
  locations: LocationDTO[] = [];
  bloodDonationForms: BloodDonationFormDTO[] = [];

  bloodDonationForm = this.formBuilder.group({
    id: this.formBuilder.control(0),
    dateOfBloodDonation: this.formBuilder.control(new Date().toISOString().split('T')[0]),
    isSuitable: this.formBuilder.control(''),
    examiningDoctorName: this.formBuilder.control(''),
    whyNotSuitable: this.formBuilder.control(''),
    isDirectedBloodDonation: this.formBuilder.control(''),
    patientFullName: this.formBuilder.control(''),
    patientTAJnumber: this.formBuilder.control(0),
    bloodDonor: this.formBuilder.control<null | BloodDonorDTO>(null),
    location: this.formBuilder.control<null | LocationDTO>(null)
  });

  constructor(
    private formBuilder: FormBuilder,
    private bloodDonorService: BloodDonorService,
    private bloodDonationFormService: BloodDonationFormService,
    private locationService: LocationService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];

    if (id) {
      this.isValidBloodDonation = false;

      this.bloodDonationFormService.getOne(id).subscribe({
        next: (bloodDonationForm) => this.bloodDonationForm.setValue(bloodDonationForm),
        error: (err) => {
          console.error(err);
          this.toastrService.error('A véradási űrlap betöltése sikertelen', 'Hiba');
        }
      });
    }

    this.locationService.getAll().subscribe({
      next: (locations) => this.locations = locations,
      error: (err) => {
        console.error(err);
        this.toastrService.error('A helyszínek betöltése sikertelen', 'Hiba');
      }
    });

    this.bloodDonorService.getAll().subscribe({
      next: (bloodDonors) => this.bloodDonors = bloodDonors,
      error: (err) => {
        console.error(err);
        this.toastrService.error('A véradók betöltése sikertelen', 'Hiba');
      }
    });
  }

  validateTAJnumber(TAJnumber: number): boolean {
    const TAJnumberString = TAJnumber.toString();

    if (TAJnumberString.length !== 9) {
      return false;
    }

    const digits = TAJnumberString.substring(0, 8);

    let sum = 0;
    for (let i = 0; i < digits.length; i++) {
      const digit = parseInt(digits[i], 10);
      sum += i % 2 === 0 ? digit * 3 : digit * 7;
    }
    const remainder = sum % 10;
    const ninthDigit = parseInt(TAJnumberString[8], 10);

    return remainder === ninthDigit;
  }
  

  

  validateForm(inputForm: BloodDonationFormDTO): void {
    if (!inputForm.dateOfBloodDonation || !inputForm.bloodDonor || !inputForm.examiningDoctorName 
      || !inputForm.isDirectedBloodDonation || !inputForm.location || !inputForm.isSuitable 
      || inputForm.location.isActive.valueOf() === false) {
      this.isValidBloodDonation = false;
    } else {
      if (inputForm.isSuitable === 'nem') {
        if (!inputForm.whyNotSuitable || inputForm.isDirectedBloodDonation === 'igen') {
          this.isValidBloodDonation = false;
        }
      }
      if (inputForm.isDirectedBloodDonation === 'igen') {
        if (!inputForm.patientFullName || !inputForm.patientTAJnumber || !this.validateTAJnumber(inputForm.patientTAJnumber)) {
          this.isValidBloodDonation = false;
        }
      }
    }
  }

  saveBloodDonationForm() {
    const bloodDonationForm = this.bloodDonationForm.value as BloodDonationFormDTO;

    this.isValidBloodDonation = true;
    this.validateForm(bloodDonationForm);

    console.log(this.isValidBloodDonation);

    if (this.isValidBloodDonation) {
      this.bloodDonationFormService.create(bloodDonationForm).subscribe({
        next: (bloodDonationForm) => {
          this.toastrService.success('Véradási űrlap sikeresen hozzáadva, id:' + bloodDonationForm.id , 'Siker');
        },
        error: (err) => { 
          this.toastrService.error('A véradási űrlap hozzáadása nem sikerült.', 'Hiba');
        }
      });
    } else {
      this.toastrService.error('A véradási űrlap hozzáadása nem sikerült.', 'Hiba');
    }
  }

  compareObjects(obj1: any, obj2: any) {
    return obj1 && obj2 && obj1.id == obj2.id; //létezik e az obj1 majd obj2 és az id-juk egyezik e
  }

}
