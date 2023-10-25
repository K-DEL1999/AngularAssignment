import { Injectable } from '@angular/core';
import { Employee, EmployeeList } from '../models/employee/employee';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private _employees:EmployeeList = new EmployeeList([]);

  private _localhost:string = "http://localhost:3000/";
  private _emp:string = "employees/";
  private _usr:string = "users/";

  constructor(private http:HttpClient){

  }

  //---get and set for variables

  get employees(){
    return this._employees;
  }

  set employees(data:EmployeeList){
    this._employees = data;
  }
  //----------------------------

  //1.create connection
  getAll():Observable<EmployeeList> | Observable<any>{
    //let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTY5ODE3MDM1MSwiZXhwIjoxNjk4MTczOTUxLCJzdWIiOiIxIn0.FomzYVCF0YiXE236-56_8belYaGUXEA68d3m339iGe8";
    //let header = new HttpHeaders().set('Authorization','Bearer ' + token);
    return this.http.get(this._localhost + this._emp).pipe(catchError(this.errorHandling));
  }

  getOne(id:number):Observable<Employee> | any{
    return this.http.get(this._localhost + this._emp + id).pipe(catchError(this.errorHandling));
  }

  deleteOne(id:number):Observable<Employee> | any{
    return this.http.delete(this._localhost + this._emp + id).pipe(catchError(this.errorHandling));
  }

  postOne(body:Employee):Observable<Employee> | any{
    return this.http.post(this._localhost + this._emp, body).pipe(catchError(this.errorHandling));
  }

  putOne(id:number, body:Employee){
    return this.http.put(this._localhost + this._emp + id, body).pipe(catchError(this.errorHandling));
  }

  errorHandling(error:HttpErrorResponse){
    return throwError(() => "Please try again later");
  }
}
