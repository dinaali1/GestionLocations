import { Voiture } from './../../../models/Voiture';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VoitureServiceService } from '../service/voiture-service.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-voiture-add',
  templateUrl: './voiture-add.component.html',
  styleUrls: ['./voiture-add.component.scss']
})
export class VoitureAddComponent implements OnInit {
  public form: FormGroup;
  private id: number;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private voitureService: VoitureServiceService,
    private datePipe: DatePipe) { }

  ngOnInit() {
    this.id = Number(this.route.snapshot.params['id']);
    if (this.id !== -1) {
      this.voitureService.getVoiture(this.id).subscribe(
        response => {
          this.form.setValue({
            numeroChassis: response.numeroChassis,
            numeroImmat: response.numeroImmat,
            marque: response.marque,
            modele: response.modele,
            dateCirculation: this.datePipe.transform(new Date(response.dateCirculation), "yyyy-MM-ddTHH:mm"),
            puissance: response.puissance,
            nombreCylindre: response.nombreCylindre,
            prixLocation: response.prixLocation,
            assureur: response.assurance.assureur,
            typeAss: response.assurance.typeAss,
            cotisation: response.assurance.cotisation,
          });
        }
      );
    }
    this.form = this.fb.group({
      numeroChassis: new FormControl('', Validators.required),
      numeroImmat: new FormControl('', Validators.required),
      marque: new FormControl('', Validators.required),
      modele: new FormControl('', Validators.required),
      dateCirculation: new FormControl('', Validators.required),
      puissance: new FormControl('', Validators.required),
      nombreCylindre: new FormControl('', Validators.required),
      prixLocation: new FormControl('', Validators.required),
      assureur: new FormControl('', Validators.required),
      typeAss: new FormControl('', Validators.required),
      cotisation: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    let voiture: Voiture;
    voiture = {
      numeroChassis: this.form.value.numeroChassis,
      numeroImmat: this.form.value.numeroImmat,
      modele: this.form.value.modele,
      marque: this.form.value.marque,
      dateCirculation: this.form.value.dateCirculation,
      puissance: this.form.value.puissance,
      nombreCylindre: this.form.value.nombreCylindre,
      prixLocation: this.form.value.prixLocation,
      assurance: {
        assureur: this.form.value.assureur,
        typeAss: this.form.value.typeAss,
        cotisation: this.form.value.cotisation
      }
    };
    if (this.id === -1) {
      this.voitureService.addVoiture(voiture).subscribe(
        response => {
          this.router.navigate(['/voiture']);
        },
        error => console.log(error)
      );
    } else {
      this.voitureService.updateVoiture(this.id, voiture).subscribe(
        response => {
          this.router.navigate(['/voiture']);
        }
      )
    }
  }
}
