import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { GlobalVariable } from './../global';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class ContatoService {
    
  private headers = new Headers({'Content-Type': 'application/json'});
  private URL: string = GlobalVariable.BASE_API_URL;
    
  constructor( private http: Http ) { }

  sendMessage(mensagem: any){

    console.log(JSON.stringify(mensagem));
    
//    let returnUsuario = this.http
//        .post(this.URL, JSON.stringify({mensagem}), {headers: this.headers})
//        .toPromise()
////          .then(res => res.json().data)
//        .then((res) => console.log(res))
//        .catch(this.handleError);
//          

  }

  private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
 }

}