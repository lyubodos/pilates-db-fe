import {Routes} from '@angular/router';
import {UserAddComponent} from "./components/user-add/user-add.component";
import {MainSectionComponent} from "./components/main-section/main-section.component";
import {ReservationsListComponent} from "./components/reservations-list/reservations-list.component";
import {UserDataListComponent} from "./components/user-data-list/user-data-list.component";
import {LoginComponent} from "./components/login/login.component";
import {AuthGuard} from "./guards/auth.guard";
import {RegisterComponent} from "./components/register/register.component";
import {ResFormComponent} from "./components/res-form/res-form.component";

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
    component: ReservationsListComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'usersList',
    pathMatch: 'full',
    component: UserDataListComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'addUser',
    pathMatch: 'full',
    component: UserAddComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'resForm',
    pathMatch: 'full',
    component: ResFormComponent,
  },


];
