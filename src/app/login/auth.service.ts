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
    showMenu: EventEmitter<boolean>;
    usuario: Usuario;

    constructor( http: Http, router: Router ) { 
        super(http,router,"usuario");
        
        this.usuario = new UsuarioBuilder().initialize(this.usuario);
        this.showMenu = new EventEmitter();
        this.showMenu.emit(false);
    }
    
    login( usuario: Usuario ) {

        let urlLogin = this.URL + "/login";
        return this.http
            .post( urlLogin, usuario, { headers: this.headers } )
            .toPromise()
                .then( res => {
                    this.usuario = new UsuarioBuilder().clone(res.json());
                    localStorage.setItem( 'token', this.usuario.getToken() );
                    localStorage.setItem( 'usuario-id', this.usuario.getId().toString() );
                    if (this.usuario.getPerfis().length > 0) 
                        this.usuario.getPerfis().forEach( perf => {
                            perf.getPermissoes().forEach( perm => {
                                localStorage.setItem( perm.getFuncionalidade(), perm.getValor().toString() );
                            } );
                        } );
                    this.showMenu.emit(true);
                    this.router.navigate( ['/home'] );
                } )
                .catch( error => {
                    this.showMenu.emit(false);
                    this.router.navigate( ['/login'] );
                } )
    }
    
}