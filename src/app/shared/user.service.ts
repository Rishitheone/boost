import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _baseUrl = "https://boost-api.sundevelopersonline.club/api";

  constructor(private _http: HttpClient) {}

  createUser(formData) {
    return this._http.post<any>(this._baseUrl + "/create-user", formData, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }).pipe(
      catchError(this.handleError)
    );
  }
  getPubliciybyId(id){
    return this._http.get<any>(this._baseUrl + "/get-activity?publicity_id="+id).pipe(
      catchError(this.handleError)
    );
  }
  getUser() {
    return this._http.get<any>(this._baseUrl + "/all-users").pipe(
      catchError(this.handleError)
    );
  }
  getChartValue() {
    return this._http.get<any>(this._baseUrl + "/get-publicity-numbers").pipe(
      catchError(this.handleError)
    );
  }
  getActiveUser() {
    return this._http.get<any>(this._baseUrl + "/running-publicities").pipe(
      catchError(this.handleError)
    );
  }
  getCompleteUser() {
    return this._http.get<any>(this._baseUrl + "/completed-publicities").pipe(
      catchError(this.handleError)
    );
  }

  getPublicities() {
    return this._http.get<any>(this._baseUrl + "/all-publicities").pipe(
      catchError(this.handleError)
    );
  }

  postPublicities(formData) {
    return this._http.post<any>(this._baseUrl + "/assign-publicity", formData, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }).pipe(
      catchError(this.handleError)
    );
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

