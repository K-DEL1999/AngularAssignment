import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BodyComponent } from './body/body.component';

import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { HighlightDirective } from './directives/highlight.directive';
import { LoginComponent } from './login/login.component';
import { InterceptService } from './services/intercept.service';
import { UppercasePipe } from './pipes/uppercase.pipe';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BodyComponent,
    HighlightDirective,
    LoginComponent,
    UppercasePipe,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, // structure: ngSwitchCase, ngIf, ngFor -- attribute: ngClass ngStyle
    ReactiveFormsModule, //add for FormGroup
    HttpClientModule // -- import { HttpClientModule } from "@angular/common/http"
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptService, multi:true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
