import { Component } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router, RouterLink} from "@angular/router";
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {FormsModule} from "@angular/forms";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatCardContent,
    MatCardHeader,
    FormsModule,
    MatLabel,
    MatFormField,
    MatError,
    RouterLink,
    MatCard,
    MatCardSubtitle,
    MatCardTitle,
    MatButton,
    MatInput,
    NgIf
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  username = '';
  password = '';
  email = '';
  firstName = '';
  lastName = '';
  error = '';
  success = '';

  constructor(private auth: AuthService, private router: Router) {}

  submit() {
    this.error = '';
    this.success = '';

    this.auth.register({
      username: this.username,
      password: this.password,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName
    }).subscribe({
      next: () => {
        this.success = 'Account created. You can now log in.';
        // optional: auto redirect after a short delay
        setTimeout(() => this.router.navigate(['/login']), 600);
      },
      error: (err) => {
        // backend may return message; fallback:
        this.error = err?.error ?? 'Registration failed';
      }
    });
  }
}
