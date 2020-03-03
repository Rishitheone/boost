import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { UserService } from 'src/app/shared/user.service';
import { ResUser } from '../../user/user.component';

@Component({
  selector: 'app-activity-table',
  templateUrl: './activity-table.component.html',
  styleUrls: ['./activity-table.component.scss']
})
export class ActivityTableComponent implements OnInit {
  displayedColumns: string[] = ["id","state","district","school"];
  searchKey: string;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort , { static: true }) sort: MatSort;
  isLoading = true;
  error:string;
  loginError: string;
  public dataSource =new MatTableDataSource<any>();

  constructor(private dialog: MatDialog, private userService: UserService) {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.dataSource.paginator = this.paginator;
    
    this.userService.getActiveUser().subscribe(
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

}
