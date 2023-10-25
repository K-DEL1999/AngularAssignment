import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { BodyComponent } from './body/body.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { loginGuard } from './guards/login.guard';
import { adminGuard } from './guards/admin.guard';

const routes: Routes = [
  {path: 'home', component: HomeComponent, canActivate:[loginGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'body', component: BodyComponent, canActivate:[adminGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
