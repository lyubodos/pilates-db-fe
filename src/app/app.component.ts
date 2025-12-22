import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {UserDataListComponent} from "./components/user-data-list/user-data-list.component";
import { HttpClient } from "@angular/common/http";
import {ReservationsService} from "./services/reservations.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'pilates-db-fe';
}
