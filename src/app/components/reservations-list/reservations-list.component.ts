import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {UserData} from "../../data/userData";
import {Observable, startWith} from "rxjs";
import {ReservationsService} from "../../services/reservations.service";
import {Router} from "@angular/router";
import {MatCard, MatCardContent, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {
  MatCell,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderRow,
  MatRow,
  MatTable,
  MatTableModule
} from "@angular/material/table";
import {MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-reservations-list',
  standalone: true,
  imports: [
    AsyncPipe,
    MatCardContent,
    MatCardTitle,
    MatCardSubtitle,
    MatCard,
    MatCell,
    MatHeaderCell,
    MatColumnDef,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButton,
    MatDialogTitle,
    MatTable,
    MatTableModule,
    MatHeaderRow,
    MatRow
  ],
  templateUrl: './reservations-list.component.html',
  styleUrl: './reservations-list.component.scss'
})
export class ReservationsListComponent implements OnInit {
  @ViewChild('deleteDialog') deleteDialogTpl!: TemplateRef<any>;

  public displayedColumns: string[] = ['firstName', 'lastName', 'email', 'actions'];
  public reservations$: Observable<UserData[]> | undefined;


  constructor(private reservationsService: ReservationsService, private router: Router, private dialog: MatDialog) {
  }

  public ngOnInit() {
    this.loadReservations();
  }


  public onUpdate(reservation: UserData) {
    // navigate to edit or open edit form
  }

  public openDeleteDialog(reservation: UserData) {
    const dialogRef = this.dialog.open(this.deleteDialogTpl, {
      data: reservation,
      backdropClass: 'custom-backdrop' // optional: darker background
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if (result === 'true') {
        this.onDeleteRedervation(reservation);
      }
    });
  }

  public onDeleteRedervation(reservation: UserData) {
    this.reservationsService.onDeleteReservation(reservation.id)
      .subscribe(() => {
        this.loadReservations();
      });
    console.log(`Reservations deleted: ${reservation}`);
  }

  public navigateToAddReservations(): void {
    this.router.navigate(['/add']);
  }


  private loadReservations(): void {
    this.reservations$ = this.reservationsService.getReservations().pipe(startWith([]));
  }
}
