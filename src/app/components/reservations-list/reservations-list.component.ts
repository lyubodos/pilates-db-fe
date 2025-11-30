import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AsyncPipe, NgForOf} from "@angular/common";
import {ReservationData} from "../../data/reservation.data";
import {Observable, startWith} from "rxjs";
import {ReservationsService} from "../../services/reservations.service";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-reservations-list',
  standalone: true,
  imports: [
    NgForOf,
    AsyncPipe
  ],
  templateUrl: './reservations-list.component.html',
  styleUrl: './reservations-list.component.scss'
})
export class ReservationsListComponent implements OnInit {
  public reservations$: Observable<ReservationData[]> | undefined;


  @ViewChild('deleteModal') deleteModal!: ElementRef;
  selectedId!: number;

  constructor(private reservationsService: ReservationsService, private router: Router, private httpClient: HttpClient) {
  }

  public ngOnInit() {
    this.loadReservations();
  }

  public loadReservations(): void {
    this.reservations$ = this.reservationsService.getReservations().pipe(startWith([]));
  }

  public onDelete(reservation: ReservationData) {
    this.httpClient.post("http://localhost:8080/reservations/delete", reservation.id).subscribe(() => {
      this.loadReservations();
    });

    console.log(`Reservations deleted: ${reservation}`);
  }


  openModal(id: number) {
    this.selectedId = id;
    (this.deleteModal.nativeElement as any).classList.add('show');
    (this.deleteModal.nativeElement as any).style.display = 'block';
  }

  closeModal() {
    (this.deleteModal.nativeElement as any).classList.remove('show');
    (this.deleteModal.nativeElement as any).style.display = 'none';
  }

  public navigateToAddReservations(): void {
    this.router.navigate(['/add']);
  }
}
