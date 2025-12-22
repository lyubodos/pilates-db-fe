import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {AuthService} from "../../services/auth.service";
import {Router, RouterLink} from "@angular/router";
import {AsyncPipe, NgIf} from "@angular/common";
import {MatToolbar, MatToolbarModule} from "@angular/material/toolbar";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    AsyncPipe,
    MatToolbar,
    MatButton,
    NgIf
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isLoggedIn$: Observable<boolean>;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {
    this.isLoggedIn$ = this.auth.isLoggedIn();
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
