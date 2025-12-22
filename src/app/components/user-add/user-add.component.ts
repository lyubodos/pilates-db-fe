import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {ReservationsService} from "../../services/reservations.service";

@Component({
  selector: 'user-add.component',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './user-add.component.html',
  styleUrl: './user-add.component.scss'
})
export class UserAddComponent {

  reservationForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private reservationsService: ReservationsService) {
  }


  public ngOnInit(): void {
    this.reservationForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, Validators.required]
    });
  }

  public submit(): void {
    if (this.reservationForm.valid) {
      const value = this.reservationForm.value;
      this.reservationsService.onSaveUser(value).subscribe(() => {
        this.router.navigate(['/']);
      })
      console.log('Form value:', value);
    }
  }
}
