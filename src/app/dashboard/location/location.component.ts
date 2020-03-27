import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { LocationService } from './service/location.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {
  public nbLocations = 0;
  displayedColumns: string[] = ['client', 'voiture', 'promotion', 'montant', 'dateDebut', 'nbJoursLocation', 'accident', 'action'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private locationService: LocationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.refreshLocation();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  refreshLocation() {
    this.locationService.getLocations().subscribe(
      response => {
        this.nbLocations = response.doc.length;
        this.dataSource.data = response.doc as any[];
      }
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  modifier(id) {
    this.router.navigate(['/location', id]);
  }

  supp(id) {
    this.locationService.deleteLocation(id).subscribe(
      response => {
        this.refreshLocation();
      }
    );
  }

}
