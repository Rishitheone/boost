import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Datum } from '../model';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _baseUrl = "https://boost-api.sundevelopersonline.club/api/login";
  constructor(private _http: HttpClient, private _router: Router) {}

  logIn(user) {
    return this._http.post<Datum>(this._baseUrl, user).pipe(
      catchError(this.handleError)
    );
  }

  loggedIn() {
    return !!localStorage.getItem("token")
  }

  logOut() {
    localStorage.removeItem("token");
    this._router.navigate(['/login'])
  }
  getToken(){
    return localStorage.getItem('token')
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {

      // A client-side or network error occurred. Handle it accordingly.

      console.error('An error occurred:', error.error.message);
    } else {

      // The backend returned an unsuccessful response code.

      // The response body may contain clues as to what went wrong.

      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }

    // return an observable with a user-facing error message

    return throwError('Something bad happened. Please try again later.');
  }
}

