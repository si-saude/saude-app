import { Router } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { GlobalVariable } from './../global'; 
import { Usuario } from './../model/usuario';


@Injectable()
export class AuthService {

  private authenticatedUser: boolean = false;
  private headers = new Headers({'Content-Type': 'application/json'});
  private URL: string = GlobalVariable.BASE_API_URL; 

  constructor(private http: Http, private router: Router) { }

  login(usuario: any){

//    if ( usuario.chave === 'nome' && usuario.senha === '123' ) {
//        console.log(usuario);
//    }
  let urlLogin = this.URL + "/usuario/login";
  this.http
      .post(urlLogin, JSON.stringify({usuario}), {headers: this.headers})
      .toPromise()
      .then(res => {
          console.log(res.headers);
          console.log(res.json());
      })
      .catch(this.handleError);
  }

  userIsAuthenticated(){
    return this.authenticatedUser;
  }
  
  private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
  }

}