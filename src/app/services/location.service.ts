import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocationDTO } from 'models';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) { }

  getAll() {
     return this.http.get<LocationDTO[]>('api/locations');
  }

  getOne(id: number) {
    return this.http.get<LocationDTO>('api/locations/' + id);
  }

  create(location: LocationDTO) {
    return this.http.post<LocationDTO>('api/locations', location);
  }

  update(location: LocationDTO) {
    return this.http.put<LocationDTO>('api/locations', location);
  }

  delete(id: number) {
    return this.http.delete('api/locations/' + id);
  }

  activateLocationStatus(location: LocationDTO) {
    return this.http.put<LocationDTO>('api/locations/', location);
  }

  deactivateLocationStatus(location: LocationDTO) {
    return this.http.put<LocationDTO>('api/locations/', location);
  }

}
