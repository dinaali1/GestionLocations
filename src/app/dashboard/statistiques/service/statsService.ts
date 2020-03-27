import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor(private http: HttpClient) { }

  getModele() {
    return this.http.get<any>('http://localhost:4500/statistiques/modele');
  }

  getMaxNbLoc() {
    return this.http.get<any>('http://localhost:4500/statistiques/maxNombreLocation');
  }

  getMaxNbJours() {
    return this.http.get<any>('http://localhost:4500/statistiques/maxNombreJoursLocation');
  }

  getNonLoc() {
    return this.http.get<any>('http://localhost:4500/statistiques/voitureNonLouee');
  }

  getRentable() {
    return this.http.get<any>('http://localhost:4500/statistiques/laPlusRentable');
  }

  getPlusAccidentee() {
    return this.http.get<any>('http://localhost:4500/statistiques/laVoitureLaPlusAccidentee');
  }

  getPlusPuissante() {
    return this.http.get<any>('http://localhost:4500/statistiques/laPlusPuissante');
  }

  getClientFidele() {
    return this.http.get<any>('http://localhost:4500/statistiques/clientFidele');
  }

  getClientAccident() {
    return this.http.get<any>('http://localhost:4500/statistiques/clientQuiAFaitLePlusAccident');
  }

  getClientRentable() {
    return this.http.get<any>('http://localhost:4500/statistiques/clientRentable');
  }

  getPlusLouee() {
    return this.http.get<any>('http://localhost:4500/statistiques/laplusLouee');
  }

}
