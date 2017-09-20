import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private formulario: FormGroup;
  
  private msgError: string = '';
  private verifyError: boolean = false;

  constructor(
          private authService: AuthService, 
          private formBuilder: FormBuilder,
          private router: Router) { }

  ngOnInit() {
      this.formulario = this.formBuilder.group({
         chave: [null, Validators.required ],
         senha: [null, Validators.required ]
      });
      
//      let ls = window.localStorage.getItem("token");
      if ( window.localStorage.getItem("token") !== undefined ||
              window.localStorage.getItem("token") !== null ||
              window.localStorage.getItem("token") !== '' ) {
          this.router.navigate(['/home']);
      }
  }

  login() {
     this.authService.login(this.formulario.value);
     
     this.verifyMsgError();
  }
  
  isValid() {
      if ( !this.formulario.get('chave').invalid && 
              !this.formulario.get('senha').invalid ) {
          return false;
      } else return true;
  }
 
  forgotPassword() { }
  
  verifyMsgError() {
      this.authService.errorMsgEmitter.subscribe(error => {
         if ( error != '' ) {
             this.verifyError = true;
             this.msgError = error;
             return true;
         } else {
             this.verifyError = false;
             this.msgError = '';
             return false;
         }
      });
  }
  
}