import { group } from '@angular/animations';
import { Token } from '@angular/compiler';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { DataService } from '../services/data.service';
import { user } from '../models/user/user';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  credentials = this.formBuilder.group({
    email: '',
    password: ''
  });

  constructor(private formBuilder:FormBuilder, public dataService:DataService, public authService:AuthService, private router:Router){}

  loggin(){
    this.authService.postLoggin(this.credentials.value).subscribe({
      next:(data:any) => {
        localStorage.setItem("userToken",data.accessToken);
        localStorage.setItem("user",data["user"]["email"]);
        localStorage.setItem("role",data["user"]["role"]);
        console.log(data.accessToken);
        this.router.navigate(['home']);
      },
      error: (err:any) => {
        alert("Invalid Username/Password")
        this.credentials.reset();
      }
    });
  }
}
