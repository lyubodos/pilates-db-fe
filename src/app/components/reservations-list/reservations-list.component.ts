import {Component, TemplateRef, ViewChild} from '@angular/core';
import {Observable, startWith} from "rxjs";
import {ReservationsService} from "../../services/reservations.service";
import {Router} from "@angular/router";
import {MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {AsyncPipe} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable, MatTableModule
} from "@angular/material/table";
import {ReservationSlot} from "../../data/reservation-slot.data";

@Component({
  selector: 'app-reservations-list',
  standalone: true,
  imports: [
    AsyncPipe,
    MatTableModule,
    MatButton,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable
  ],
  templateUrl: './reservations-list.component.html',
  styleUrl: './reservations-list.component.scss'
})
export class ReservationsListComponent {
  @ViewChild('deleteDialog') deleteDialogTpl!: TemplateRef<any>;

  public displayedColumns: string[] = ['sessionDate', 'startTime', 'endTime', 'trainingType', 'capacity', 'status', 'remainingSlots', 'actions'];
  public reservations$: Observable<ReservationSlot[]> | undefined;


  constructor(private reservationsService: ReservationsService, private router: Router, private dialog: MatDialog) {
  }

  public ngOnInit() {
    this.loadReservations();
    console.log(this.reservations$?.subscribe((reservations) => {
      console.log(reservations)
    }))
  }


  public onUpdateReservations(reservation: ReservationSlot) {
    // navigate to edit or open edit form
  }

  public openDeleteDialog(reservation: ReservationSlot) {
    const dialogRef = this.dialog.open(this.deleteDialogTpl, {
      data: reservation,
      backdropClass: 'custom-backdrop' // optional: darker background
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if (result === 'true') {
        this.onDeleteReservation(reservation);
      }
    });
  }

  public onDeleteReservation(reservation: ReservationSlot) {
    this.reservationsService.onDeleteReservation(reservation.id)
      .subscribe(() => {
        this.loadReservations();
      });
    console.log(`Reservations deleted: ${reservation}`);
  }

  public navigateToMain(){
    this.router.navigate(['/']);
  }


  private loadReservations(): void {
    this.reservations$ = this.reservationsService.getReservations().pipe(startWith([]));
  }
}
