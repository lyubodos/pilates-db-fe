import {Component, OnInit} from '@angular/core';
import {Observable, startWith} from "rxjs";
import {ReservationsService} from "../../services/reservations.service";
import {Router} from "@angular/router";
import {UserData} from "../../data/userData";
import {UserDataListComponent} from "../user-data-list/user-data-list.component";
import {ReservationsListComponent} from "../reservations-list/reservations-list.component";
import {CommonModule} from "@angular/common";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-main-section',
  standalone: true,
  imports: [
    CommonModule,
    UserDataListComponent,
    ReservationsListComponent
  ],
  templateUrl: './main-section.component.html',
  styleUrl: './main-section.component.scss'
})
export class MainSectionComponent implements OnInit  {
  public reservations$: Observable<UserData[]> | undefined;


  constructor(private reservationsService: ReservationsService, private router: Router, private authService: AuthService) {
  }


  public ngOnInit() {
    this.loadReservations();
  }


  public navigateUsers(): void {
    this.router.navigate(['/usersList']);
  }

  public navigateToReservations(): void {
    this.router.navigate(['/reservationsList']);
  }

  public isAdmin(){
    return this.authService.isAdmin() === "true";
  }


  private loadReservations(): void {
    this.reservations$ = this.reservationsService.getUsers().pipe(startWith([]));
  }

}
