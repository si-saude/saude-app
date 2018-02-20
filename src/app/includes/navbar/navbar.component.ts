import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from './../../login/auth.service';

import { Usuario } from './../../model/usuario';
import { UsuarioBuilder } from './../../controller/usuario/usuario.builder';
import { GlobalVariable } from './../../global';

@Component( {
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
} )
export class NavbarComponent {
    private theme: string = GlobalVariable.THEME_API;
    private route: string;
    private logged: boolean;
    private usuario: Usuario;
    private callServer: boolean;

    constructor( private router: Router, private location: Location,
        private authService: AuthService ) {
        this.logged = false;
        this.callServer = false;
        this.usuario = new UsuarioBuilder().initialize( this.usuario );
    }

    ngOnInit() {
        this.router.events.subscribe( val => {
            this.route = this.location.prepareExternalUrl( this.location.path() );
        } )
    }

    ngDoCheck() {
        if ( localStorage.getItem( "token" ) != undefined &&
            localStorage.getItem( "token" ) != null &&
            localStorage.getItem( "token" ) != '' ) {
            this.logged = true;
            
            if ( !this.callServer ) {
                this.callServer = true;
                if ( localStorage.getItem( "usuario-id" ) != undefined ) {
                    this.authService.getUsuario( Number( localStorage.getItem( "usuario-id" ) ) )
                        .then( res => {
                            this.usuario = new UsuarioBuilder().clone( res.json() );
                        } )
                        .catch( error => {
                            console.log( "Erro no servidor ao buscar o usuario." );
                        } )
                } else {
                    console.log( "Usuario nao logada ou erro no localStorage." );
                }
            }
            
        } else {
            this.logged = false
            this.callServer = false;
        }
    }

    logoff() {
        localStorage.clear();
        this.router.navigate( ['login'] );
    }

    login() {
        this.router.navigate( ['login'] );
    }

}
