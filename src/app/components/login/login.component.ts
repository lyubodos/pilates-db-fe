import { Component } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router, RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {MatInput} from "@angular/material/input";
import {CommonModule} from "@angular/common";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatError,
    MatFormField,
    MatCardContent,
    MatCardHeader,
    MatCard,
    MatInput,
    MatLabel,
    MatCardSubtitle,
    MatCardTitle,
    MatButton,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}


  public submit(): void {
    this.error = '';
    this.auth.login(this.username, this.password).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => {
        this.error = 'Invalid credentials';
        console.log(err);
      }
    });
  }
}
