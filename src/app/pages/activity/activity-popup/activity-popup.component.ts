import { Component, OnInit, Inject } from '@angular/core';
import { ResUser } from '../../user/user.component';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-activity-popup',
  templateUrl: './activity-popup.component.html',
  styleUrls: ['./activity-popup.component.scss']
})
export class ActivityPopupComponent implements OnInit {
 // id:number;
 imgr:string;
 imgrg:string;
 dataSource:ResUser[] = [];

 constructor(private _route:ActivatedRoute,private fb: FormBuilder,
   public dialogRef: MatDialogRef<ActivityPopupComponent>,@Inject(MAT_DIALOG_DATA) public data:any,
   private userService:UserService,
   ) { 
     this.imgr = data.school_photo;
     this.imgrg = data.ground_photo;
   }

 form = this.fb.group({
   publicity_id:this.data.id,
   user_id:'',
 })

 ngOnInit() {
   this.userService.getUser().subscribe(
     res => {
       this.dataSource = res.data as ResUser[];
     },
     err => console.log(err)
   );
 }

 onClose() {
   this.form.reset();
   this.dialogRef.close();
 }
 onSubmit() {
   if (!this.form.valid) {
     return;
   } else {
     console.log(this.form.value);
     const formData = JSON.stringify(this.form.value);
     console.log(formData);
     this.userService.postPublicities(formData).subscribe(
       res => {
         console.log(res);
         if (res.status === 1) {
          //  this.toastr.success("Inserted successfully", "Series Register");
           this.form.reset();
           this.dialogRef.close();
         } else {
           return
         }
       },
       err => {
         console.log(err)
       }
     );
   }
 }

 onClear() {
   this.form.reset();
 }

}
