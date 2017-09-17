import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GlobalVariable } from './../../global';
import { AuthService } from './../../login/auth.service';

@Component({
  selector: 'app-navbar-principal',
  templateUrl: './navbar-principal.component.html',
  styleUrls: ['./navbar-principal.component.css']
})
export class NavbarPrincipalComponent implements OnInit {
    
  private theme: string = GlobalVariable.THEME_API;

  constructor(
          private authService: AuthService, 
          private router: Router) { }

  ngOnInit() {
  }

  logout() {
//      this.authService.setAuthenticatedUser(false);
//      let ls = window.localStorage.getItem("token");
      
      if ( window.localStorage.getItem("token") !== undefined || 
              window.localStorage.getItem("token") !== null ||
              window.localStorage.getItem("token") !== '' ) {
          this.authService.showMenuEvent.emit(false);
          window.localStorage.removeItem("token");
      }
      
      this.router.navigate(["/login"]);
      
  }
  
}