import { Routes } from '@angular/router';
import {ReservationsListComponent} from "./components/reservations-list/reservations-list.component";
import {ReservationAddComponent} from "./components/reservation-add/reservation-add.component";

export const routes: Routes = [
  {
    path: '',
    component: ReservationsListComponent
  },

  {
    path: 'add',
    pathMatch:'full',
    component: ReservationAddComponent
  },
];
