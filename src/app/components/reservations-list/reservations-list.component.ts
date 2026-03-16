import {AfterViewInit, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Observable, startWith} from "rxjs";
import {ReservationsService} from "../../services/reservations.service";
import {Router} from "@angular/router";
import {MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {AsyncPipe, NgIf} from "@angular/common";
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
import {AuthService} from "../../services/auth.service";
import {MatSort} from "@angular/material/sort";

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
    MatTable,
    NgIf,
    MatSort
  ],
  templateUrl: './reservations-list.component.html',
  styleUrl: './reservations-list.component.scss'
})
export class ReservationsListComponent implements OnInit, AfterViewInit{
  @ViewChild('deleteDialog') deleteDialogTpl!: TemplateRef<any>;
  @ViewChild(MatSort) sort!: MatSort;

  public displayedColumns: string[] = ['sessionDate', 'startTime', 'endTime', 'trainingType', 'capacity', 'status', 'remainingSlots', 'actions'];
  public reservations$: Observable<ReservationSlot[]> | undefined;


  constructor(private reservationsService: ReservationsService, private router: Router, private dialog: MatDialog, private authService: AuthService) {
  }

  public ngOnInit() {
    this.loadReservations();
  }

  ngAfterViewInit() {
  }


  public onBookTraining(reservation: ReservationSlot) {
    this.reservationsService.onBookReservation(reservation.id).subscribe(() => {
      this.loadReservations();
    });
  }

  public onCancelReservation(reservation: ReservationSlot) {
    this.reservationsService.onCancelReservation(reservation.id).subscribe(() => {
      this.loadReservations();
    });
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

  public checkStatus(reservation: ReservationSlot){
    return reservation.status != "Full";
  }

  public navigateToMain() {
    this.router.navigate(['/']);
  }

  public getAdminValue() {
    return this.authService.isAdmin() == "true";
  }


  private loadReservations(): void {
    this.reservations$ = this.reservationsService.getReservations().pipe(startWith([]));
  }
}
