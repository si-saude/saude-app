import { Router } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { GlobalVariable } from './../../global';
import { Usuario } from './../../model/usuario';
import { PerfilFilter } from './perfil.filter';
import { GenericService } from './../../generics/generic.service';

@Injectable()
export class PerfilService extends GenericService {

    constructor( http: Http, router: Router ) {
        super( http, router, "perfil" );
    }
    
    getAll(id) {
        let urlGetAll = this.URL + "/get-all";
        return this.http
            .get( urlGetAll + "?id=" + id, { headers: this.headers } )
            .toPromise();
    }

    getFuncionalidades() {
        let urlLogin = GlobalVariable.BASE_API_URL + "/generic/funcionalidade?filter=";
        return this.http
            .get( urlLogin, { headers: this.headers } )
            .toPromise();
    }
    
    getPerfis() {
        return this.selectList(new PerfilFilter());
    }


}