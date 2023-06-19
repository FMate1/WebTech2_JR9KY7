import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BloodDonorDTO } from 'models';


@Injectable({
  providedIn: 'root'
})
export class BloodDonorFormService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<BloodDonorDTO[]>('api/bloodDonors');
 }

 getOne(id: number) {
   return this.http.get<BloodDonorDTO>('api/bloodDonors/' + id);
 }

 create(bloodDonorForm: BloodDonorDTO) {
   return this.http.post<BloodDonorDTO>('api/bloodDonors', bloodDonorForm);
 }

 update(bloodDonorForm: BloodDonorDTO) {
   return this.http.put<BloodDonorDTO>('api/bloodDonors', bloodDonorForm);
 }

 delete(id: number) {
   return this.http.delete('api/bloodDonors/' + id);
 }

}
