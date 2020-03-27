import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ClientService } from './service/client.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})

export class ClientComponent implements OnInit {
  public nbClients = 0;
  displayedColumns: string[] = ['NCIN', 'numeroPermis', 'nom', 'prenom', 'dateDeNaissance', 'adresse', 'action'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private clientService: ClientService,
    private router: Router) { }

  ngOnInit() {
    this.refreshClient();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  refreshClient() {
    this.clientService.getClients().subscribe(
      response => {
        this.nbClients = response.doc.length
        this.dataSource.data = response.doc as any[];
      }
    );
  }
  modifier(id) {
    this.router.navigate(['/client', id]);
  }
  supp(id) {
    this.clientService.deleteClient(id).subscribe(
      response => {
        this.refreshClient();
      }
    );
  }

}
