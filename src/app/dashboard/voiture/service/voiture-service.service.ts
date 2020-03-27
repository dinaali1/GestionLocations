import { Voiture } from './../../../models/Voiture';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VoitureServiceService {

  constructor(private http: HttpClient) { }

  getVoitures() {
    return this.http.get<{doc:any}>('http://localhost:4500/voiture');
  }
  getVoiture(id: number){
    return this.http.get<any>(`http://localhost:4500/voiture/${id}`);
  }

  deleteVoiture(id: number) {
    return this.http.delete(`http://localhost:4500/voiture/${id}`);
  }

  addVoiture(voiture: Voiture) {
    return this.http.post("http://localhost:4500/voiture/", voiture);
  }

  updateVoiture(id: number,voiture: Voiture) {
    return this.http.put(`http://localhost:4500/voiture/${id}`,voiture);
  }
}
