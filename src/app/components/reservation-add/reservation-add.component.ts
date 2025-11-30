import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {ReservationData} from "../../data/reservation.data";
import {RouterLink} from "@angular/router";

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

  constructor(private fb: FormBuilder, private httpClient: HttpClient) {
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
      this.httpClient.post<ReservationData>("http://localhost:8080/reservations/save", this.reservationForm.value).pipe().subscribe();
      console.log('Form value:', value);
    }
  }
}
