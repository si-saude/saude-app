import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { UsuarioFilter } from './../usuario/usuario.filter';

import { GenericService } from './../../generics/generic.service';

@Injectable()
export class UsuarioService extends GenericService {

    constructor( http: Http, router: Router ) { 
        super(http, router, "usuario");
    }
   
    getUsuarios() {
        return this.selectList(new UsuarioFilter());
    }
    
}