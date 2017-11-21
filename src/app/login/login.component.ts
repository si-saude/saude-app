import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Usuario } from './../model/usuario';
import { UsuarioBuilder } from './../controller/usuario/usuario.builder';
import { AuthService } from './auth.service';
import { GenericFormComponent } from './../generics/generic.form.component';

@Component( {
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
} )
export class LoginComponent extends GenericFormComponent {
    usuario: Usuario;

    constructor(
        private authService: AuthService,
        private router: Router ) {
        super(authService);
        
        this.goTo = "login";
        this.usuario = new UsuarioBuilder().initialize(this.usuario);
    }

    ngOnInit() {
        if ( localStorage.getItem("token") !== undefined || 
                localStorage.getItem("token") !== null || 
                localStorage.getItem("token") !== '') 
            this.router.navigate(['/home']);
    }

    login() {
        this.authService.login( this.usuario );
    }

    forgotPassword() { }
}