import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { UsuarioFilter } from './usuario.filter';
import { GenericService } from './../../generics/generic.service';
import { PerfilService } from './../perfil/perfil.service';

@Injectable()
export class UsuarioService extends GenericService {

    constructor( http: Http, router: Router,
            private perfilService: PerfilService) { 
        super(http, router, "usuario");
    }
   
    getUsuarios() {
        return this.selectList(new UsuarioFilter());
    }
    
    getPerfis() {
        return this.perfilService.getPerfis();
    }
    
}