import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Observable, startWith, Subject, takeUntil} from "rxjs";
import {AuthService} from "../../services/auth.service";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
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
    NgIf,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  public isLoggedIn$: Observable<boolean>;
  public loggedInUser: string | null = "";
  public loggedInUser$: Observable<string | null> | undefined;
  private destroy$ = new Subject<void>();


  constructor(
    private auth: AuthService,
    private router: Router
  ) {
    this.isLoggedIn$ = this.auth.isLoggedIn();
  }

  public ngOnInit() {
    this.getUser();
    console.log(`Logged in: ${this.loggedInUser}`);
  }


  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public logout() {
    this.loggedInUser = '';
    this.auth.logout();
  }

  public getUser(){
   this.auth.getLoggedInUser().pipe(
     takeUntil(this.destroy$),
   ).subscribe(user => {
     if(user == ""){
       this.loggedInUser = localStorage.getItem("username");
     } else {
       this.loggedInUser = user;
     }
   })
  }

  public isAdmin(){
    return this.auth.isAdmin() === "true";
  }
}
