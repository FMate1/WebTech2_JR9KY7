import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BloodDonorFormService } from '../services/bloodDonorForm.service';
import { BloodDonorDTO } from 'models';

@Component({
  selector: 'app-bloodDonor-form',
  templateUrl: './bloodDonor-form.component.html',
  styleUrls: ['./bloodDonor-form.component.css']
})
export class BloodDonorFormComponent implements OnInit {

  isValidBloodDonor = true;
  
  bloodDonorForm = this.formBuilder.group({
    id: this.formBuilder.control(0),
    name: this.formBuilder.control(''),
    gender: this.formBuilder.control(''),
    nationality: this.formBuilder.control(''),
    placeOfBirth: this.formBuilder.control(''),
    dateOfBirth: this.formBuilder.control(new Date().toISOString().split('T')[0]),
    homeAdress: this.formBuilder.control(''),
    TAJnumber: this.formBuilder.control(0)
  });

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private bloodDonorFormService: BloodDonorFormService
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];

    if (id) {
      this.isValidBloodDonor = false;

      this.bloodDonorFormService.getOne(id).subscribe({
        next: (bloodDonorForm) => this.bloodDonorForm.setValue(bloodDonorForm),
        error: (err) => {
          console.error(err);
          this.toastrService.error('A véradó űrlap betöltése sikertelen', 'Hiba');
        }
      });
    }
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

  validateForm(inputForm: BloodDonorDTO): void {
    if (!inputForm.name || !inputForm.gender || !inputForm.nationality || !inputForm.placeOfBirth || !inputForm.dateOfBirth
      || !inputForm.homeAdress || !this.validateTAJnumber(inputForm.TAJnumber)) {
      this.isValidBloodDonor = false;
    }
  }

  saveBloodDonor() {
    const bloodDonor = this.bloodDonorForm.value as BloodDonorDTO;

    this.isValidBloodDonor = true;
    this.validateForm(bloodDonor);
   
    if (this.isValidBloodDonor) {
      this.bloodDonorFormService.create(bloodDonor).subscribe({
        next: (bloodDonor) => {
          this.toastrService.success('Véradó sikeresen hozzáadva, id:' + bloodDonor.id , 'Siker');
        },
        error: (err) => { 
          this.toastrService.error('A veradó hozzáadása nem sikerült.', 'Hiba');
        }
      });
    } else {
      this.toastrService.error('A veradó hozzáadása nem sikerült.', 'Hiba');
    }
  }
}
