import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { Employee, EmployeeList } from '../models/employee/employee';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent {

  //https://angular.io/guide/reactive-forms

  employeeInfo = this.formBuilder.group({
    FirstName: [null,Validators.required],
    LastName: [null,Validators.required],
    Age:  [null,Validators.required],
    Gender: [null,Validators.required]
  });

  /*
  using formGroup
  ================

  no need to inject constructor

  employeeInfo = new FormGroup({
    FirstName: new FormControl("<initial value>"),
    LastName: new FormControl("<initial value>"),
    Age: new FormControl("<initial value>"),
  });
  */

  searchedEmployeeId = new FormControl('');

  searchedEmployee = this.formBuilder.group({
    FirstName: '',
    LastName: '',
    Age: '',
    Gender: ''
  });

  constructor(public dataService:DataService, private formBuilder:FormBuilder){}

  ngOnInit(){
    //2. Send data to server
    let Observable = this.dataService.getAll();
    //3. Listen to data coming back
    Observable.subscribe(
      (data) => {this.dataService.employees = new EmployeeList(data)},
      (err) => {console.log(err)}
    );
  }

  view(Id:number){
    /*let employee:Employee | null = this.dataService.employees.findOne(Id);

    if (employee == null){
      alert("Value not found");
    }

    alert(employee?.displayInfo());*/
    this.dataService.getOne(Id).subscribe({
    next:(data:Employee) => {
        let employee = data;
        alert(
          this.displayEmployee(employee)
        );
      },
      error: (err:any) => {console.log(err)}
    });
  }

  remove(Id:number){
    let cfm = confirm("Are you sure you want to delete?");
    if (cfm){
      /*this.dataService.employees.delete(Id);
      setTimeout(() => {
        alert("You have successfully deleted employee");
      },500)*/
      this.dataService.deleteOne(Id).subscribe({
        next: (data:any) => {
          this.dataService.employees.delete(Id);
          alert("You have successfully deleted employee");
        },
        error: (err:any) => {console.log(err)}
      });
    }
    location.reload();
  }

  add(){
    let canBeInserted:boolean = true;
    let nullFind:number = 0;

    if (this.employeeInfo.value.Age == null || this.employeeInfo.value.FirstName == null || this.employeeInfo.value.LastName == null){
      canBeInserted = false;
    }

    if (canBeInserted){
      let newEmployee: Employee = {
        id: this.dataService.employees.generateId(),
        firstName: (this.employeeInfo.value.FirstName) ? this.employeeInfo.value.FirstName : "noInfoFound",
        lastName: (this.employeeInfo.value.LastName) ? this.employeeInfo.value.LastName : "noInfoFound",
        age: (this.employeeInfo.value.Age) ? this.employeeInfo.value.Age : -1,
        gender: (this.employeeInfo.value.Gender) ? this.employeeInfo.value.Gender : "noInfoFound"
      };

      this.dataService.postOne(newEmployee).subscribe(
        {next: (data:Employee) => {
          this.dataService.employees.insert(newEmployee);
          setTimeout(() => {
            alert("You have successfully created employee");
          },500)
        },
        error: (err:any) => {console.log(err)}
      });
    }
    else {
      alert("employee was not added -- data fields missing");
    }

    this.employeeInfo.reset();
  }

  searchForData(emp:NgForm){
    let employee = this.dataService.employees.findOne(Number(emp.value.Id));
    if (employee != null){
      this.searchedEmployeeId.setValue(employee.id.toString());
      this.searchedEmployee.value.FirstName = employee.firstName;
      this.searchedEmployee.value.LastName = employee.lastName;
      this.searchedEmployee.value.Age = employee.age.toString();
      this.searchedEmployee.value.Gender = employee.gender;
    }
    else {
      alert("Employee Not found");
    }
  }

  updateEmployee(){
    if (this.searchedEmployee.value.Age && this.searchedEmployee.value.FirstName && this.searchedEmployee.value.LastName){
      let employee = this.dataService.employees.findOne(Number(this.searchedEmployeeId.value));
      if (employee != null){
        this.dataService.employees.delete(employee.id);
        let newEmployee = {
          id: employee.id,
          firstName: (this.searchedEmployee.value.FirstName) ? this.searchedEmployee.value.FirstName : "NoInfo",
          lastName: (this.searchedEmployee.value.LastName) ? this.searchedEmployee.value.LastName : "NoInfo",
          age: (this.searchedEmployee.value.Age) ? Number(this.searchedEmployee.value.Age) : -1,
          gender: (this.searchedEmployee.value.Gender) ? this.searchedEmployee.value.Gender : "NoInfo"
        };

        this.dataService.putOne(employee.id,newEmployee).subscribe({
          next:(data:any)=>{
            this.dataService.employees.insert(newEmployee);
            this.searchedEmployeeId.setValue('');

            setTimeout(() => {
              alert("You have successfully updated employee");
            },500)
          },
          error:(err)=>{console.log(err)}
        });
      }
      else {
        alert("employee not found");
      }
    }
    else {
      alert("employee was not updated -- data fields missing");
    }
  }

  resetSearch(){
    this.searchedEmployeeId.setValue('');
  }

  displayEmployee(employee:Employee):string{
    let display:string = "\nEmployee Details\n\n";

    if (employee){
      for (let prop in employee){
        display += (prop + ": " + employee[prop] + "\n");
      }
    }
    else {
      display += "noInfoFound\n";
    }

    return display;
  }
}
