import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class InterceptService implements HttpInterceptor{

  constructor() {}

  //get request from front end -- change accordingly -- send to backend with end
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authToken = localStorage.getItem("userToken"); // get from storing in local storage in browser

    if (authToken){
      const modified_req = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + authToken)
      });

      return next.handle(modified_req);
    }

    return next.handle(req);
  }
}
