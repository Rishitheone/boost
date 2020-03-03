import { Component, OnInit, ViewChild } from "@angular/core";
import {
  MatPaginator,
  MatSort,
  MatTableDataSource,
  MatDialog
} from "@angular/material";
import { ResUser } from "../user/user.component";
import { UserService } from "src/app/shared/user.service";
import { Router } from "@angular/router";
import { ActivityPopupComponent } from "./activity-popup/activity-popup.component";

@Component({
  selector: "app-activity",
  templateUrl: "./activity.component.html",
  styleUrls: ["./activity.component.scss"]
})
export class ActivityComponent implements OnInit {
  displayedColumns: string[] = ["id", "state", "district", "assign"];
  searchKey: string;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  isLoading = true;
  foods: ResUser[] = [];
  error:string;
  loginError: string;

  public dataSource = new MatTableDataSource<ResUser>();

  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.dataSource.paginator = this.paginator;

    this.userService.getPublicities().subscribe(
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

  onAssign(element) {
    // this.router.navigate(['/home/Activity',id])
    let dialogRef = this.dialog.open(ActivityPopupComponent, {
      width: "80%",
      autoFocus: true,
      disableClose: true,
      data: {
        id: element.id,
        name: element.school_name,
        school_photo: element.school_photo,
        ground_photo: element.ground_photo
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.userService.getPublicities().subscribe(
        data => {
          this.dataSource.data = data.data as ResUser[];
        },
        err => console.log(err)
      );
    });
  }

  onBack() {
    this.router.navigate(["/home"]);
  }
}
