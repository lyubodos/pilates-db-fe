import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {UserDataListComponent} from "./components/user-data-list/user-data-list.component";
import { HttpClient } from "@angular/common/http";
import {ReservationsService} from "./services/reservations.service";
import {HeaderComponent} from "./components/header/header.component";
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  standalone: true,
    imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'pilates-db-fe';

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    // this.authService.restoreSession();
  }
}
