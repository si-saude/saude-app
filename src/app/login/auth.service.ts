import { Router } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Usuario } from './../model/usuario';
import { GlobalVariable } from './../global';
import { GenericService } from './../generics/generic.service';
import { UsuarioBuilder } from './../controller/usuario/usuario.builder';

@Injectable()
export class AuthService extends GenericService {
    logged: EventEmitter<boolean>;
    usuario: Usuario;

    constructor( http: Http, router: Router ) { 
        super(http,router,"usuario");
        
        this.usuario = new UsuarioBuilder().initialize(this.usuario);
        this.logged = new EventEmitter<boolean>();
    }
    
    login( usuario: Usuario ) {
        let urlLogin = this.URL + "/login";
        return this.http
            .post( urlLogin, usuario, { headers: this.headers } )
            .toPromise();
    }
    
}