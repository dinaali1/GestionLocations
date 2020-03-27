import { Client } from './../../../models/Client';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  getClients() {
    return this.http.get<{ doc: any }>('http://localhost:4500/client');
  }

  getClient(id: number) {
    return this.http.get<any>(`http://localhost:4500/client/${id}`);
  }

  deleteClient(id: number) {
    return this.http.delete(`http://localhost:4500/client/${id}`);
  }

  addClient(client: Client) {
    return this.http.post('http://localhost:4500/client/', client);
  }

  updateClient(id: number, client: Client) {
    return this.http.put(`http://localhost:4500/client/${id}`, client);
  }

}
