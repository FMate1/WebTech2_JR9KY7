import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BloodDonationFormListComponent } from './bloodDonationForm-list/bloodDonationForm-list.component';
import { BloodDonationFormComponent } from './bloodDonationForm-form/bloodDonationForm-form.component';
import { LocationListComponent } from './location-list/location-list.component';
import { BloodDonorFormComponent } from './bloodDonor-form/bloodDonor-form.component';
import { LocationFormComponent } from './location-form/location-form.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';

const routes: Routes = [
  {
    path: '',
    component: BloodDonationFormListComponent
  },
  {
    path: 'product-form',
    component: BloodDonationFormComponent,
    canActivate: [ () => inject(AuthService).preventGuestAccess() ]
  },
  {
    path: 'product-form/:id',
    component: BloodDonationFormComponent,
    canActivate: [ () => inject(AuthService).preventGuestAccess() ]
  },
  {
    path: 'location-list',
    component: LocationListComponent
  },
  {
    path: 'bloodDonor-form',
    component: BloodDonorFormComponent,
    canActivate: [ () => inject(AuthService).preventGuestAccess() ]
  },
  {
    path: 'location-form',
    component: LocationFormComponent,
    canActivate: [ () => inject(AuthService).preventGuestAccess() ]
  },
  {
    path: 'registration-form',
    component: RegistrationFormComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
