import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Usuario } from './../model/usuario';
import { UsuarioBuilder } from './../controller/usuario/usuario.builder';
import { AuthService } from './auth.service';
import { GenericComponent } from './../generics/generic.component';

@Component( {
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
} )
export class LoginComponent extends GenericComponent {
    usuario: Usuario;
    
    constructor(
        private authService: AuthService, private rtr: Router ) {
        super( rtr );
        
        this.usuario = new UsuarioBuilder().initialize(this.usuario);   
        this.showPreload = false;
        this.msgPreload = "Aguarde processamento...";
    }

    ngOnInit() {
        if ( localStorage.getItem("token") !== undefined && 
                localStorage.getItem("token") !== null && 
                localStorage.getItem("token") !== "") 
            this.rtr.navigate(['/home']);
    }
    
    login() {
        this.showPreload = true;
        this.authService.login( this.usuario )
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
                this.showPreload = false;
                setTimeout(() => {
                    this.rtr.navigate( ['/home'] );
                }, 100);
            } )
            .catch( error => {
                console.log(error);
                this.catchConfiguration(error);
                this.showPreload = false;
            } )
    }

    forgotPassword() { }
}