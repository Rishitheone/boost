import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';
import { MatDialogRef } from '@angular/material';
import { NotificationService } from 'src/app/shared/notification.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {

  form: FormGroup;
  users = [
    {value: 'user', viewValue: 'User'},
    {value: 'leader', viewValue: 'Leader'},
  ];
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    public dialogRef: MatDialogRef<UserCreateComponent>,
    private notificationService: NotificationService,
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      role: ["",Validators.required],
      password: ["", [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() {
    return this.form.controls;
  }

  onClose() {
    this.form.reset();
    this.dialogRef.close();
  }

  onSubmit() {
    console.log(this.form.value)
    if (!this.form.valid) {
      return;
    } else {
      const formData = JSON.stringify(this.form.value);
      this.userService.createUser(formData).subscribe(
        res => {
          console.log(res);
          if (res.status === 1) {
            this.notificationService.success(':: Submitted successfully');
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
