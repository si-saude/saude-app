import { Router } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { GlobalVariable } from './../../global'
import { GenericService } from './../../generics/generic.service';

@Injectable()
export class PerguntaFichaColetaService extends GenericService {

    constructor( http: Http, router: Router ) {
        super( http, router, "pergunta-ficha-coleta" );
    }

    getGrupos() {
        let urlGrupos = GlobalVariable.BASE_API_URL + "/generic/grupo-pergunta-ficha-coleta";
        return this.http
            .get( urlGrupos + "?filter=", { headers: this.headers } )
            .toPromise();
    }
    
    getTipos() {
        let urlTipos = GlobalVariable.BASE_API_URL + "/generic/tipo-pergunta-ficha-coleta";
        return this.http
            .get( urlTipos + "?filter=", { headers: this.headers } )
            .toPromise();
    }
}