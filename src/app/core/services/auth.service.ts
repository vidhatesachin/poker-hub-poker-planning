import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn=false;
  constructor() { }
  logout(){
      sessionStorage.clear();
      this.loggedIn=false;
  }
}