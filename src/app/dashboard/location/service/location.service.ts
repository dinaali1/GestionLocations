import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) { }

  getLocations() {
    return this.http.get<{ doc: any }>('http://localhost:4500/location');
  }

  getLocation(id:number) {
    return this.http.get<any>(`http://localhost:4500/location/${id}`);
  }

  deleteLocation(id:number) {
    return this.http.delete(`http://localhost:4500/location/${id}`);
  }

  addLocation(location: any) {
    return this.http.post('http://localhost:4500/location/', location);
  }

  updateLocation(id: number, location: any) {
    return this.http.put(`http://localhost:4500/location/${id}`, location);
  }

}
