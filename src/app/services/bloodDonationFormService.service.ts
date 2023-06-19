import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BloodDonationFormDTO } from 'models';

@Injectable({
  providedIn: 'root'
})
export class BloodDonationFormService {

  constructor(private http: HttpClient) { }

  getAll() {
     return this.http.get<BloodDonationFormDTO[]>('api/bloodDonationForms');
  }

  getOne(id: number) {
    return this.http.get<BloodDonationFormDTO>('api/bloodDonationForms/' + id);
  }

  create(bloodDonationForm: BloodDonationFormDTO) {
    return this.http.post<BloodDonationFormDTO>('api/bloodDonationForms', bloodDonationForm);
  }

  update(bloodDonationForm: BloodDonationFormDTO) {
    return this.http.put<BloodDonationFormDTO>('api/bloodDonationForms', bloodDonationForm);
  }

  delete(id: number) {
    return this.http.delete('api/bloodDonationForms/' + id);
  }
}
