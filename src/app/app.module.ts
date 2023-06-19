import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BloodDonationFormListComponent } from './bloodDonationForm-list/bloodDonationForm-list.component';
import { BloodDonationFormComponent } from './bloodDonationForm-form/bloodDonationForm-form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { LocationListComponent } from './location-list/location-list.component';
import { BloodDonorFormComponent } from './bloodDonor-form/bloodDonor-form.component';
import { LocationFormComponent } from './location-form/location-form.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { LoginComponent } from './login/login.component';
import { AccessTokenInterceptor } from './services/access-token.interceptor';
import { UnauthorizedInterceptor } from './services/unauthorized.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    BloodDonationFormListComponent,
    BloodDonationFormComponent,
    LocationListComponent,
    BloodDonorFormComponent,
    LocationFormComponent,
    RegistrationFormComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AccessTokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UnauthorizedInterceptor,
      multi: true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
