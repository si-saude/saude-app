import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Aso } from './../../model/aso';
import { AsoFilter } from './../aso/aso.filter';
import { UsuarioService } from './../usuario/usuario.service';
import { RequisitoAsoService } from './../requisito-aso/requisito-aso.service';
import { RequisitoAsoFilter } from './../requisito-aso/requisito-aso.filter';
import { GenericService } from './../../generics/generic.service';

@Injectable()
export class AuditoriaAsoService extends GenericService {

    constructor( http: Http, router: Router,
            private requisitoAsoService: RequisitoAsoService,
            private usuarioService: UsuarioService ) { 
        super(http,router,"aso");
    }
    
    getListExame( aso: Aso) {
        let urlList = this.URL + "/list-requisito-exame";
        return this.http
            .post( urlList, aso, { headers: this.headers } )
            .toPromise();
    }
    
    getRequisitos() {
        return this.requisitoAsoService.selectList( new RequisitoAsoFilter() );
    }
    
    getUsuarioById( id ) {
        return this.usuarioService.get( id );
    }
    
}