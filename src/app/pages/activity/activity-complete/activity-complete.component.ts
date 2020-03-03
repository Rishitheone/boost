import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { ResUser } from '../../user/user.component';
import { UserService } from 'src/app/shared/user.service';
import { CompletePopupComponent } from '../complete-popup/complete-popup.component';

@Component({
  selector: 'app-activity-complete',
  templateUrl: './activity-complete.component.html',
  styleUrls: ['./activity-complete.component.scss']
})
export class ActivityCompleteComponent implements OnInit {
  displayedColumns: string[] = ["id","state","district","school",'Details'];
  searchKey: string;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort , { static: true }) sort: MatSort;
  isLoading = true;
  error:string;
  loginError: string;
  public dataSource =new MatTableDataSource<ResUser>();

  constructor(private dialog: MatDialog, private userService: UserService) {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.dataSource.paginator = this.paginator;
    
    this.userService.getCompleteUser().subscribe(
      res => {
        if(res.status == 1){
        this.isLoading = false;
        this.dataSource.data = res.data as ResUser[];
        }else{
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

  onDetails(id){
    console.log(id);
    let dialogRef = this.dialog.open(CompletePopupComponent, {
      width: '60%',
      autoFocus: true,
      disableClose: true,
      data:{id:id}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.userService.getCompleteUser().subscribe(
        data =>{
          this.dataSource.data = data.data as ResUser[];
        },
        err => console.log(err));
    });
  }

}

