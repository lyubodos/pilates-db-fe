import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {ReservationsService} from "../../services/reservations.service";

@Component({
  selector: 'app-reservation-add',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './reservation-add.component.html',
  styleUrl: './reservation-add.component.scss'
})
export class ReservationAddComponent {

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
      this.reservationsService.onSave(value).subscribe(() => {
        this.router.navigate(['/']);
      })
      console.log('Form value:', value);
    }
  }
}
