import { Router } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { GlobalVariable } from './../../global'; 
import { Usuario } from './../../model/usuario';
import { PerfilFilter } from './perfil.filter';

@Injectable()
export class PerfilService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private URL: string = GlobalVariable.BASE_API_URL; 

  constructor(private http: Http, private router: Router) { }

  getFuncoes(substring: string){
      
      let urlLogin = this.URL + "/generic/funcao?filter=";
      return this.http
          .get(urlLogin + substring, {headers: this.headers})
          .toPromise();
  }
  
  submit(formulario: any) {
      console.log("submit" + JSON.stringify(formulario));
      let urlSubmit = this.URL + "/perfil";
      return this.http
          .post(urlSubmit, formulario, {headers: this.headers})
          .toPromise();
  }
  
  get(id: number) {
      let urlGet = this.URL + "/perfil";
      return this.http
          .get(urlGet+"?id="+id, {headers: this.headers})
          .toPromise();
  }
  
  list(perfilFilter: PerfilFilter) {
      let urlList = this.URL + "/perfil/list";
      return this.http
          .post(urlList, perfilFilter, {headers: this.headers})
          .toPromise();
  }

  delete(id) {
      let urlDelete = this.URL + "/perfil/delete";
      return this.http
          .post(urlDelete, id, {headers: this.headers})
          .toPromise();
  }
  
  private handleError(error: any): Promise<any> {
      console.error('Um erro ocorreu: ', error._body);
      return Promise.reject(error.message || error);
  }

}