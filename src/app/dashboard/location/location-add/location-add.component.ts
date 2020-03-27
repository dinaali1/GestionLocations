import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { LocationService } from '../service/location.service';


@Component({
  selector: 'app-location-add',
  templateUrl: './location-add.component.html',
  styleUrls: ['./location-add.component.scss']
})
export class LocationAddComponent implements OnInit {
  public form: FormGroup;
  id: number;
  public carNotFound: Boolean;
  public clientNotFound: Boolean;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private locationService: LocationService,
    private datePipe: DatePipe) { }

  ngOnInit() {
    this.id = Number(this.route.snapshot.params['id']);
    if (this.id !== -1) {
      this.locationService.getLocation(this.id).subscribe(
        response => {
          console.log(response);
          this.form.setValue({
            NChassis: response.voiture.numeroChassis,
            NCIN: response.client.NCIN,
            promotion: response.promotion,
            montant: response.montant,
            dateDeDebut: this.datePipe.transform(new Date(response.dateDebut), "yyyy-MM-dd"),
            nbJoursLocation: response.nbJoursLocation,
            accidentDescription: response.accident[0].description,
            accidentLieu: response.accident[0].lieu,
            accidentDate: (response.accident[0].date !== null) ? (this.datePipe.transform(new Date(response.accident[0].date), "yyyy-MM-dd")) : "",
          });
        }
      );
    }
    this.form = this.fb.group({
      NChassis: new FormControl('', Validators.required),
      NCIN: new FormControl('', Validators.required),
      promotion: new FormControl('', Validators.required),
      montant: new FormControl('', Validators.required),
      dateDeDebut: new FormControl('', Validators.required),
      nbJoursLocation: new FormControl('', Validators.required),
      accidentDescription: new FormControl(''),
      accidentLieu: new FormControl(''),
      accidentDate: new FormControl(''),
    });
  }
  onSubmit() {
    this.carNotFound = false;
    this.clientNotFound = false;
    let location = {
      NCIN: this.form.value.NCIN,
      numeroChassis: this.form.value.NChassis,
      promotion: this.form.value.promotion,
      montant: this.form.value.montant,
      dateDeDebut: this.form.value.dateDeDebut,
      nbJoursLocation: this.form.value.nbJoursLocation,
      accident: {
        description: this.form.value.accidentDescription,
        lieu: this.form.value.accidentLieu,
        date: this.form.value.accidentDate
      }
    }
    if (this.id === -1) {
      this.locationService.addLocation(location).subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/location']);
        },
        error => {
          if (error.error.message === 'ClientNotFound') {
            this.clientNotFound = true;
          } else if (error.error.message === 'CarNotFound') {
            this.carNotFound = true
          } else {
            console.log(error)
          }
        }
      );
    } else {
      this.locationService.updateLocation(this.id, location).subscribe(
        response => {
          this.router.navigate(['/location']);
        },
        error => {
          if (error.error.message === 'ClientNotFound') {
            this.clientNotFound = true;
          } else if (error.error.message === 'CarNotFound') {
            this.carNotFound = true
          } else {
            console.log(error)
          }
        }
      );
    }
  }
}
