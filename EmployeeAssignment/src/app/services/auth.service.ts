import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { user } from '../models/user/user';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _localhost = "http://localhost:3000/"

  constructor(private http:HttpClient, private router:Router) { }

  postLoggin(body:any):Observable<string> | any{
    //returns token
    return this.http.post<user>(this._localhost + "login",body).pipe(catchError(this.errorHandling));
  }

  isLoggedIn(){
    if(localStorage.getItem("userToken")){
      return true;
    }
    return false;
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['login']);
  }

  isAdmin(){
    if (localStorage.getItem("role") === "Admin"){
      return true;
    }
    return false;
  }

  errorHandling(error:HttpErrorResponse){
    return throwError(() => "Please try again later");
  }

}
