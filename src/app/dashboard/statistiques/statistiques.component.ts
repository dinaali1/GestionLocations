import { Component, OnInit } from '@angular/core';
import { StatsService } from './service/statsService';

@Component({
  selector: 'app-statistiques',
  templateUrl: './statistiques.component.html',
  styleUrls: ['./statistiques.component.scss']
})
export class StatistiquesComponent implements OnInit {
  public modele: any = null;
  public voit = {
    modele: null,
    marque: null,
    numeroImmat: null,
    puissance: null
  };
  public client = {
    NCIN: null,
    nom: null,
    prenom: null
  }
  public maxNbLocations =
    {
      voiture: this.voit,
      nbLoc: null,
    };
  public maxNbJoursLocation =
    {
      voiture: this.voit,
      nbJours: null,
    };
  public nonLouee =
    {
      voiture: [this.voit],
    };
  public voitureRentable =
    {
      voiture: this.voit,
      montant: null,
    };
  public voiturePlusAccidentee =
    {
      voiture: [{ _id: this.voit, accident: null }],
    };
  public voiturePlusPuissante =
    {
      voiture: this.voit,
    };
  public clientFidele = {
    client: [{ _id: this.client }],
    nbloc: null
  };
  public clientAccident = {
    client: [{ _id: this.client, accident: null }],
  };
  public clientRentable = {
    client: [{ _id: this.client, montant: null }],
  };
  public plusLouee = {
    doc: {
      voiture: this.voit,
      nbJoursLocation: null
    }
  };

  constructor(private statsService: StatsService) { }

  ngOnInit() {
    this.statsService.getModele().subscribe(
      response => {
        this.modele = response.doc[0]._id
      },
      error => console.log(error)
    );
    this.statsService.getMaxNbLoc().subscribe(
      response => {
        console.log(response);
        this.maxNbLocations = response
      },
      error => console.log(error)
    );
    this.statsService.getMaxNbJours().subscribe(
      response => {
        this.maxNbJoursLocation = response;
      },
      error => console.log(error)
    );
    this.statsService.getNonLoc().subscribe(
      response => {
        if (response.voiture.length > 0) {
          this.nonLouee = response;
        }
      },
      error => console.log(error)
    );
    this.statsService.getRentable().subscribe(
      response => {
        this.voitureRentable = response;
      },
      error => console.log(error)
    );
    this.statsService.getPlusAccidentee().subscribe(
      response => {
        this.voiturePlusAccidentee = response;
      },
      error => console.log(error)
    );
    this.statsService.getPlusPuissante().subscribe(
      response => {
        this.voiturePlusPuissante = response;
      },
      error => console.log(error)
    );
    this.statsService.getClientFidele().subscribe(
      response => {
        this.clientFidele = response;
      },
      error => console.log(error)
    );
    this.statsService.getClientAccident().subscribe(
      response => {
        this.clientAccident = response;
      },
      error => console.log(error)
    );
    this.statsService.getClientRentable().subscribe(
      response => {
        this.clientRentable = response;
      },
      error => console.log(error)
    );
    this.statsService.getPlusLouee().subscribe(
      response => {
        this.plusLouee = response;
      },
      error => console.log(error)
    );
  };
}
