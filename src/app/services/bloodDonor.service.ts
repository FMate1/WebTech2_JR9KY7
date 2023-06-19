import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BloodDonorDTO } from 'models';

@Injectable({
  providedIn: 'root'
})
export class BloodDonorService {

  constructor(private http: HttpClient) { }

  getAll() {
     return this.http.get<BloodDonorDTO[]>('api/bloodDonors');
  }

  getOne(id: number) {
    return this.http.get<BloodDonorDTO>('api/bloodDonors/' + id);
  }

  create(bloodDonor: BloodDonorDTO) {
    return this.http.post<BloodDonorDTO>('api/bloodDonors', bloodDonor);
  }

  update(bloodDonor: BloodDonorDTO) {
    return this.http.put<BloodDonorDTO>('api/bloodDonors', bloodDonor);
  }

  delete(id: number) {
    return this.http.delete('api/bloodDonors/' + id);
  }

}
