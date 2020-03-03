import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginUserData = {
    email:'',
    password:'',
  };
  error:string;
  loginError: string;
  constructor(private auth: AuthService, private _router: Router) { }

  ngOnInit() {
  }

  loginUser() {
    this.auth.logIn(this.loginUserData).subscribe(
      res => {
        if(res.status == 1){
          localStorage.setItem("token", res.user.jwtToken);
          this._router.navigate(["/home"]);
        }else{
          this.loginError = 'Username or password is incorrect.';
        }
        
      },
      error => this.error = error
    );
  }

}
