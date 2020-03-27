import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutes } from './dashboard.routing';
import { VoitureComponent } from './voiture/voiture.component';
import { ClientComponent } from './client/client.component';
import { LocationComponent } from './location/location.component';
import {
  MatBadgeModule, MatBottomSheetModule,
  MatButtonModule, MatCardModule,
  MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatDialogModule, MatExpansionModule,
  MatFormFieldModule, MatGridListModule,
  MatIconModule,
  MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule,
  MatPaginatorModule, MatRadioModule, MatSelectModule, MatSidenavModule, MatSortModule, MatStepperModule,
  MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import { VoitureAddComponent } from './voiture/voiture-add/voiture-add.component';
import { ClientAddComponent } from './client/client-add/client-add.component';
import { LocationAddComponent } from './location/location-add/location-add.component';
import { StatistiquesComponent } from './statistiques/statistiques.component';

@NgModule({
  imports: [
    MatSelectModule,
    MatFormFieldModule,

    CommonModule,
    MatTableModule,
    FormsModule,
    HttpClientModule,
    MatIconModule,
    MatFormFieldModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatNativeDateModule,
    MatDatepickerModule, MatGridListModule,
    MatSelectModule, MatToolbarModule,
    MatRadioModule,
    MatInputModule,
    PerfectScrollbarModule,
    MatSortModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatTabsModule, MatMenuModule,
    MatTooltipModule,
    MatExpansionModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatDialogModule,
    MatChipsModule,
    MatStepperModule,
    MatTabsModule,
    MatMenuModule,
    RouterModule.forChild(DashboardRoutes)
  ],
  declarations: [DashboardComponent, VoitureComponent, ClientComponent, LocationComponent, VoitureAddComponent, ClientAddComponent, LocationAddComponent, StatistiquesComponent]
})
export class DashboardModule {}
