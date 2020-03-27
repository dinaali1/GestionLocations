import { Client } from './../../../models/Client';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ClientService } from '../service/client.service';


@Component({
  selector: 'app-client-add',
  templateUrl: './client-add.component.html',
  styleUrls: ['./client-add.component.scss']
})
export class ClientAddComponent implements OnInit {
  public form: FormGroup;
  private id: number;
  private client: Client;
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router,
    private clientService: ClientService, private datePipe: DatePipe) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    if (this.id != -1) {
      this.clientService.getClient(this.id).subscribe(
        response => {
          this.form.setValue({
            NCIN: response.NCIN,
            numeroPermis: response.numeroPermis,
            nom: response.nom,
            prenom: response.prenom,
            dateDeNaissance: this.datePipe.transform(new Date(response.dateDeNaissance), "yyyy-MM-dd"),
            adresse: response.adresse
          });
        }
      );
    }
    this.form = this.fb.group({
      NCIN: new FormControl('',Validators.compose([Validators.required, Validators.minLength(8),Validators.maxLength(8)])),
      numeroPermis: new FormControl('',([Validators.required, Validators.minLength(6),Validators.maxLength(8)])) ,
      nom: new FormControl('', Validators.required),
      prenom: new FormControl('', Validators.required),
      dateDeNaissance: new FormControl('', ([Validators.required])),
      adresse: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    this.client = this.form.value;
    if (Number(this.id) === -1) {
      this.clientService.addClient(this.client).subscribe(
        response => {
          this.router.navigate(['/client']);
        }
      );
    } else {
      this.clientService.updateClient(this.id, this.client).subscribe(
        response => {
          this.router.navigate(['/client']);
        }
      )
    }
  }
}
