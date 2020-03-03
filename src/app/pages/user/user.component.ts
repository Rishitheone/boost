import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { UserService } from 'src/app/shared/user.service';
import { UserCreateComponent } from './user-create/user-create.component';
import { NotificationService } from 'src/app/shared/notification.service';
import { Router } from '@angular/router';
export interface ResUser {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
}
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  isLoading = true;
  displayedColumns: string[] = ["id", "name", "email", "created_at"];
  searchKey: string;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  error: string;
  loginError: string;

  public dataSource = new MatTableDataSource<ResUser>();

  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private router: Router,
  ) { }

 
  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.dataSource.paginator = this.paginator;

    this.userService.getUser().subscribe(
      res => {
        console.log(res.data)
        if (res.status == 1) {
          this.isLoading = false;
          this.dataSource.data = res.data as ResUser[];
        } else {
          this.loginError = 'Server Side Problem..';
        }
      },
      error => this.error = error
    );
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onAddUser() {
    let dialogRef = this.dialog.open(UserCreateComponent, {
      width: '60%',
      autoFocus: true,
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(result => {
      this.userService.getUser().subscribe(
        data => {
          this.dataSource.data = data.data as ResUser[];
        },
        err => console.log(err));
    });
  }

  onBack() {
    this.router.navigate(['/home']);
  }

}
