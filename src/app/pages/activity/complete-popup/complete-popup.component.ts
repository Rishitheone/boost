import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-complete-popup',
  templateUrl: './complete-popup.component.html',
  styleUrls: ['./complete-popup.component.scss']
})
export class CompletePopupComponent implements OnInit {
  public details:any = []
  constructor(private userService:UserService,
    public dialogRef: MatDialogRef<CompletePopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    ) { }
     

  ngOnInit() {
    this.userService.getPubliciybyId(this.data.id).subscribe(
      res =>{
        console.log(res),
        this.details = res.data
      },
      err => console.log(err)
    )
  }

  onClose() {
    this.dialogRef.close();
  }

  onClick(){}
    

}
