import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { VoitureServiceService } from './service/voiture-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-voiture',
  templateUrl: './voiture.component.html',
  styleUrls: ['./voiture.component.scss']
})
export class VoitureComponent implements OnInit {
  public nbVoitures = 0;
  displayedColumns: string[] = ['numeroChassis', 'numeroImmat', 'marque', 'modele', 'dateCirculation', 'puissance', 'nombreCylindre', 'prixLocation', 'assurance', 'action'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private voitureService: VoitureServiceService,
    private router: Router) { }

  ngOnInit() {
    this.refreshVoiture();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  refreshVoiture() {
    this.voitureService.getVoitures().subscribe(
      response => {
        this.nbVoitures = response.doc.length;
        this.dataSource.data = response.doc as any[];
      }
    );
  }
  modifier(id) {
    this.router.navigate(['/voiture', id]);
  }
  supp(id) {
    this.voitureService.deleteVoiture(id).subscribe(
      response => {
        this.refreshVoiture();
      }
    );
  }

}
