import {Component, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {Observable, startWith} from "rxjs";
import {ReservationsService} from "../../services/reservations.service";
import {Router} from "@angular/router";
import {UserData} from "../../data/userData";
import {UserDataListComponent} from "../user-data-list/user-data-list.component";
import {ReservationsListComponent} from "../reservations-list/reservations-list.component";
import {HeaderComponent} from "../header/header.component";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-main-section',
  standalone: true,
  imports: [
    CommonModule,
    MatButton,
    MatCard,
    MatCardSubtitle,
    MatCardTitle,
    UserDataListComponent,
    ReservationsListComponent,
    HeaderComponent
  ],
  templateUrl: './main-section.component.html',
  styleUrl: './main-section.component.scss'
})
export class MainSectionComponent implements OnInit  {
  public reservations$: Observable<UserData[]> | undefined;


  constructor(private reservationsService: ReservationsService, private router: Router) {
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


  private loadReservations(): void {
    this.reservations$ = this.reservationsService.getUsers().pipe(startWith([]));
  }

}
