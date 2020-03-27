import { Routes } from '@angular/router';

import {VoitureComponent} from './voiture/voiture.component';
import {ClientComponent} from './client/client.component';
import {LocationComponent} from './location/location.component';
import {VoitureAddComponent} from './voiture/voiture-add/voiture-add.component';
import {ClientAddComponent} from './client/client-add/client-add.component';
import { LocationAddComponent } from './location/location-add/location-add.component';
import { StatistiquesComponent } from './statistiques/statistiques.component';

export const DashboardRoutes: Routes = [
  {
    path: 'voiture',
    component: VoitureComponent
  },
  {
    path: 'client',
    component: ClientComponent
  },
  {
    path: 'location',
    component: LocationComponent
  },
  {
    path: 'voiture/:id',
    component: VoitureAddComponent
  },
  {
    path: 'client/:id',
    component: ClientAddComponent
  },
  {
    path: 'location/:id',
    component: LocationAddComponent
  },
  {
    path: 'statistiques',
    component: StatistiquesComponent
  },
];
