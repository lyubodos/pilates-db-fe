import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {UserData} from "../../data/userData";
import {Observable, startWith} from "rxjs";
import {ReservationsService} from "../../services/reservations.service";
import {Router} from "@angular/router";
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
  selector: 'user-data-list',
  standalone: true,
  imports: [
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
    MatRow,
    AsyncPipe
  ],
  templateUrl: './user-data-list.component.html',
  styleUrl: './user-data-list.component.scss'
})
export class UserDataListComponent implements OnInit {
  @ViewChild('deleteDialog') deleteDialogTpl!: TemplateRef<any>;

  @Input() public reservations: UserData[] = [];

  public displayedColumns: string[] = ['firstName', 'lastName', 'email', 'actions'];
  public users$: Observable<UserData[]> | undefined;


  constructor(private reservationsService: ReservationsService, private router: Router, private dialog: MatDialog) {
  }

  public ngOnInit() {
    this.loadUsers();
  }


  public onUpdateUser(reservation: UserData) {
    // navigate to edit or open edit form
  }

  public openDeleteDialog(userData: UserData) {
    const dialogRef = this.dialog.open(this.deleteDialogTpl, {
      data: userData,
      backdropClass: 'custom-backdrop' // optional: darker background
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'true') {
        this.onDeleteUser(userData);
      }
    });
  }

  public navigateToAddUser(): void {
    this.router.navigate(['/addUser']);
  }


  private loadUsers(): void {
    this.users$ = this.reservationsService.getUsers().pipe(startWith([]));
  }

  private onDeleteUser(reservation: UserData) {
    this.reservationsService.onDeleteUser(reservation.id)
      .subscribe(() => {
        this.loadUsers();
      });
    console.log(`Reservations deleted: ${reservation}`);
  }
}
