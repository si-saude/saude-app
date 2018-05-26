import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { GlobalVariable } from './../../global';
import { TipoSolicitacao } from './../../model/tipo-solicitacao';
import { TipoSolicitacaoFilter } from './tipo-solicitacao.filter';
import { GenericService } from './../../generics/generic.service';

@Injectable()
export class TipoSolicitacaoService extends GenericService {

    constructor( http: Http, router: Router ) { 
        super(http,router,"tipo-solicitacao");
    }
    
    getTipoSolicitacoes() {
        return this.selectList(new TipoSolicitacaoFilter());
    }
    
}