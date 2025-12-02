import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ReservationsListComponent} from "./components/reservations-list/reservations-list.component";
import { HttpClient } from "@angular/common/http";
import {ReservationsService} from "./services/reservations.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReservationsListComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'pilates-db-fe';
}
