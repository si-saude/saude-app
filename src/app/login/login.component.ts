import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private formulario: FormGroup;
  private isAuthenticated: boolean = false;
  private authenticationFailure: boolean = false;

  constructor(private authService: AuthService, private formBuilder: FormBuilder) { }

  ngOnInit() {
      this.formulario = this.formBuilder.group({
         chave: [null, Validators.required ],
         senha: [null, Validators.required ]
      });
  }

  login() {
    console.log(this.authService.login(this.formulario.value));
    if ( this.authService.login(this.formulario.value) ) {
        this.authenticationFailure = false;
    } else {
        this.authenticationFailure = true;
    }
  }
  
  isValid() {
      if ( !this.formulario.get('chave').invalid && 
              !this.formulario.get('senha').invalid ) {
          return false;
      } else return true;
  }
 
  forgotPassword() { }
  
  verifyValidAuthentication() {
      if ( this.authenticationFailure ) {
          return true;
      } else { 
          return false;
      }
      
  }
  
}