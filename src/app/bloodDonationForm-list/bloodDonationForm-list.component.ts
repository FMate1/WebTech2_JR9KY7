import { Component, OnInit } from '@angular/core';
import { BloodDonationFormDTO, BloodDonorDTO, LocationDTO } from 'models';
import { BloodDonationFormService } from '../services/bloodDonationFormService.service';
import { ToastrService } from 'ngx-toastr';
import { BloodDonorService } from '../services/bloodDonor.service';
import { LocationService } from '../services/location.service';

@Component({
  selector: 'app-bloodDonationForm-list',
  templateUrl: './bloodDonationForm-list.component.html',
  styleUrls: ['./bloodDonationForm-list.component.css']
})

export class BloodDonationFormListComponent implements OnInit {
  bloodDonationForms: BloodDonationFormDTO[] = [];
  bloodDonors: BloodDonorDTO[] = [];
  locations: LocationDTO[] = [];

  selectedBloodDonor: any = '';
  selectedLocation: any = '';
  selectedStartDate: string = '';
  selectedEndDate: string = '';

  filteredBloodDonationForms: BloodDonationFormDTO[] = [];

  constructor(
    private bloodDonationFormService: BloodDonationFormService,
    private bloodDonorService: BloodDonorService,
    private locationService: LocationService,
    private toastrService: ToastrService
  ) { this.loadData(); }

  ngOnInit(): void {
    this.bloodDonationFormService.getAll().subscribe({
      next: (bloodDonationForms) => {
        this.bloodDonationForms = bloodDonationForms;
      },
      error: (err) => { 
        this.toastrService.error('A véradás űrlapjának betöltése nem sikerült.', 'Hiba');
      }
    });

    this.bloodDonorService.getAll().subscribe({
      next: (bloodDonors) => {
        this.bloodDonors = bloodDonors;
      },
      error: (err) => { 
        this.toastrService.error('A véradók listájának betöltése nem sikerült.', 'Hiba');
      }
    });

    this.locationService.getAll().subscribe({
      next: (locations) => {
        this.locations = locations;
      },
      error: (err) => { 
        this.toastrService.error('A helyszínek listájának betöltése nem sikerült.', 'Hiba');
      }
    });
  }

  loadData(): void {
    this.bloodDonationFormService.getAll().subscribe(
      (bloodDonationForms) => {
        this.bloodDonationForms = bloodDonationForms;
        this.filterTable();
      },
      (error) => {
        this.toastrService.error('A véradás űrlapjának betöltése nem sikerült.', 'Hiba');
      }
    );
  }

  filterTable() {
    this.filteredBloodDonationForms = this.bloodDonationForms.filter((bloodDonationForm) => {
      const matchesFirstSelector = this.selectedBloodDonor === '' || bloodDonationForm.bloodDonor?.id === this.selectedBloodDonor.id;
      const matchesSecondSelector = this.selectedLocation === '' || bloodDonationForm.location?.id === this.selectedLocation.id;

      const startDate = this.selectedStartDate ? new Date(this.selectedStartDate) : null;
      const endDate = this.selectedEndDate ? new Date(this.selectedEndDate) : null;
      const itemDate = new Date(bloodDonationForm.dateOfBloodDonation);
      const isDateInRange =
        (!startDate || itemDate >= startDate) &&
        (!endDate || itemDate <= endDate);

      return matchesFirstSelector && matchesSecondSelector && isDateInRange;
    });

    if (!this.selectedBloodDonor && !this.selectedLocation && !this.selectedStartDate && !this.selectedEndDate) {
      this.filteredBloodDonationForms = this.bloodDonationForms;
    }
  }
}
