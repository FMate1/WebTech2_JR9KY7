import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocationService } from '../services/location.service';
import { LocationDTO } from 'models';

@Component({
  selector: 'app-location-form',
  templateUrl: './location-form.component.html',
  styleUrls: ['./location-form.component.css']
})
export class LocationFormComponent implements OnInit {

  isValidLocation = true;

  locationForm = this.formBuilder.group({
    id: this.formBuilder.control(0),
    institutionName: this.formBuilder.control(''),
    adress: this.formBuilder.control(''),
    isActive: this.formBuilder.control(true)
  });

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private locationService: LocationService
  ) { }

  
  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];

    if (id) {
      this.isValidLocation = false;

      this.locationService.getOne(id).subscribe({
        next: (locationForm) => this.locationForm.setValue(locationForm),
        error: (err) => {
          console.error(err);
          this.toastrService.error('A helyszínek betöltése sikertelen', 'Hiba');
        }
      });
    }
  }

  validateForm(inputForm: LocationDTO): void {
    if (!inputForm.institutionName || !inputForm.adress || !inputForm.isActive) {
      this.isValidLocation = false;
    }
  }

  saveLocation() {
    const location = this.locationForm.value as LocationDTO;

    this.isValidLocation = true;
    this.validateForm(location);
   
    if (this.isValidLocation) {
      this.locationService.create(location).subscribe({
        next: (location) => {
          this.toastrService.success('A helyszín sikeresen hozzáadva, id:' + location.id , 'Siker');
        },
        error: (err) => { 
          this.toastrService.error('A helyszín hozzáadása nem sikerült.', 'Hiba');
        }
      });
    } else {
      this.locationService.update(location).subscribe({
        next: (location) => {
          this.toastrService.success('A helyszín sikeresen szerkesztve.' , 'Siker');
        },
        error: (err) => { 
          this.toastrService.error('A helyszín szerkesztése nem sikerült.', 'Hiba');
        }
      });
    }
  }






}
