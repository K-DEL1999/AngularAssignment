import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  selected:number = 0;

  constructor(public dataService:DataService, public authService:AuthService, public router:Router){
  }

  logout(){
    alert("You have logged out...");

  }
}
