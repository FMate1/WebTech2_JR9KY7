import { Component, OnInit } from '@angular/core';
import { LocationDTO } from 'models';
import { LocationService } from '../services/location.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.css']
})
export class LocationListComponent implements OnInit {
  locations: LocationDTO[] = [];

  constructor(
    private locationService: LocationService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.locationService.getAll().subscribe({
      next: (locations) => {
        this.locations = locations;
      },
      error: (err) => {
        this.toastrService.error('A helyszínek betöltése nem sikerült.', 'Hiba');
      }
    });

  }

  activateLocation(location: LocationDTO) {
    location.isActive = true;
    this.locationService.activateLocationStatus(location).subscribe({
      next: () => {
        this.toastrService.success('Helyszín aktiválva' , 'Siker');
      },
      error: (err) => {
        console.error(err);
        this.toastrService.error('Hiba a helyszín aktiválásakor.', 'Hiba');
      }
    })
  }

  deactivateLocation(location: LocationDTO) {
    location.isActive = false;
    this.locationService.activateLocationStatus(location).subscribe({
      next: () => {
        this.toastrService.success('Helyszín deaktiválva' , 'Siker');
      },
      error: (err) => {
        console.error(err);
        this.toastrService.error('Hiba a helyszín deaktiválásakor.', 'Hiba');
      }
    })
  }
}
