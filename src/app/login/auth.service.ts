import { Router } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Usuario } from './../model/usuario';
import { GlobalVariable } from './../global';
import { GenericService } from './../generics/generic.service';
import { UsuarioBuilder } from './../controller/usuario/usuario.builder';
import { UsuarioService } from './../controller/usuario/usuario.service';
import { PessoaService } from './../controller/pessoa/pessoa.service';

@Injectable()
export class AuthService extends GenericService {
    logged: EventEmitter<boolean>;
    usuario: Usuario;

    constructor( http: Http, router: Router,
            private usuarioService: UsuarioService,
            private pessoaService: PessoaService) { 
        super(http,router,"usuario");
        
        this.usuario = new UsuarioBuilder().initialize(this.usuario);
    }
    
    login( usuario: Usuario ) {
        let urlLogin = this.URL + "/login";
        console.log(urlLogin);
        return this.http
            .post( urlLogin, usuario, { headers: this.headers } )
            .toPromise();
    }
    
    getUsuario(id) {
        return this.usuarioService.get(id);
    }
    
}