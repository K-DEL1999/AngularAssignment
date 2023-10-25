import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  isLoggedIn!:string | null;
  constructor(){
    this.isLoggedIn = localStorage.getItem("isLoggedIn");
  }
}
