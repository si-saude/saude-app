import { Router } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { GlobalVariable } from './../global'; 
import { Usuario } from './../model/usuario';


@Injectable()
export class AuthService {

  public showMenuEvent = new EventEmitter<boolean>();
  public errorMsgEmitter = new EventEmitter<string>();
  
//  private authenticatedUser: boolean = false;
  
  private usuario: Usuario = new Usuario();
  private headers = new Headers({'Content-Type': 'application/json'});
  private URL: string = GlobalVariable.BASE_API_URL; 

  constructor(private http: Http, private router: Router) { }

  login(usuario: any){

//    if ( usuario.chave === 'nome' && usuario.senha === '123' ) {
//        console.log(usuario);
//    }
  let urlLogin = this.URL + "/usuario/login";
  this.http
      .post(urlLogin, JSON.stringify(usuario), {headers: this.headers})
      .toPromise()
      .then(res => {
          this.showMenuEvent.emit(true);
//          this.authenticatedUser = true;
//          console.log(res.headers);
//          console.log(res.json());
//          this.usuario = JSON.parse(res.json());
          window.localStorage.setItem("token", res.json().token);
          this.router.navigate(["/home"]);
          //gravar token e permissoes
      })
      .catch(error => {
//          this.authenticatedUser = false;
          this.errorMsgEmitter.emit(error._body);
      });
  }
//
//  getAuthenticatedUser(){
//    return this.authenticatedUser;
//  }
//  
//  setAuthenticatedUser(value: boolean) {
//      this.authenticatedUser = value;
//  }
//  
  private handleError(error: any): Promise<any> {
//      console.log(error._body);
      console.error('Um erro ocorreu: ', error._body); // for demo purposes only
      return Promise.reject(error.message || error);
  }

}