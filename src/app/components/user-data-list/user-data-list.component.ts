import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {UserData} from "../../data/userData";
import {map, Observable, startWith} from "rxjs";
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
import {AuthService} from "../../services/auth.service";

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
  public isAdmin: boolean = false;


  constructor(private authService: AuthService, private reservationsService: ReservationsService, private router: Router, private dialog: MatDialog) {
  }

  public ngOnInit() {
    this.loadUsers();
    this.checkAdminRights()
  }


  public onUpdateUser(userData: UserData) {
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
    let currentUser: string | null;
    this.authService.getLoggedInUser().subscribe((user => {
     if(user == ""){
       currentUser = localStorage.getItem("username");
     } else{
       currentUser = user;
     }
    }));
    this.users$ = this.reservationsService.getUsers()
      .pipe(
        map(users => users.filter(u => u.username !== currentUser)),
        startWith([])
      );
  }

  private onDeleteUser(user: UserData) {
    this.reservationsService.onDeleteUser(user.id)
      .subscribe(() => {
        this.loadUsers();
      });
    console.log(`User deleted: ${user}`);
  }

  private checkAdminRights() {
    this.isAdmin = this.authService.hasRole("ROLE_ADMIN");
  }
}
