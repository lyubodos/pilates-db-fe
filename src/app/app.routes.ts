import {Routes} from '@angular/router';
import {UserAddComponent} from "./components/user-add/user-add.component";
import {MainSectionComponent} from "./components/main-section/main-section.component";
import {ReservationsListComponent} from "./components/reservations-list/reservations-list.component";
import {UserDataListComponent} from "./components/user-data-list/user-data-list.component";
import {LoginComponent} from "./components/login/login.component";
import {AuthGuard} from "./guards/auth.guard";
import {RegisterComponent} from "./components/register/register.component";

export const routes: Routes = [
  {
    path: '',
    component: MainSectionComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'register',
    component: RegisterComponent
  },

  {
    path: 'reservationsList',
    pathMatch: 'full',
    component: ReservationsListComponent
  },

  {
    path: 'usersList',
    pathMatch: 'full',
    component: UserDataListComponent
  },

  {
    path: 'addUser',
    pathMatch: 'full',
    component: UserAddComponent
  },


];
