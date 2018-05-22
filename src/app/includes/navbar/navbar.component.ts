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
    private chave: string;

    constructor( private router: Router, private location: Location,
        private authService: AuthService ) {
        this.usuario = new UsuarioBuilder().initialize( this.usuario );
    }
    
    ngOnInit() {
        this.router.events.subscribe( val => {
            this.route = this.location.prepareExternalUrl( this.location.path() );
        } )
    }
    
    ngDoCheck() {
        if ( localStorage.getItem('usuario-chave') != undefined &&
                localStorage.getItem('usuario-chave') != null &&
                localStorage.getItem('usuario-chave') != '') {
                    this.chave = localStorage.getItem('usuario-chave');
                    this.logged = true
        } else {
            this.chave = '';
            this.logged = false;
        }
        console.log(this.logged)
    }

    logoff() {
        localStorage.clear();
        this.router.navigate( ['login'] );
    }

    login() {
        this.router.navigate( ['login'] );
    }

}
