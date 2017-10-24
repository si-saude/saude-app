import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { TipoGrupoMonitoramento } from './../../model/tipo-grupo-monitoramento';
import { TipoGrupoMonitoramentoFilter } from './tipo-grupo-monitoramento.filter';
import { GenericService } from './../../generics/generic.service';

@Injectable()
export class TipoGrupoMonitoramentoService extends GenericService {

    constructor( http: Http, router: Router ) { 
        super(http,router,"tipo-grupo-monitoramento");
    }
    
    getTiposGrupoMonitoramento() {
        return this.selectList(new TipoGrupoMonitoramentoFilter());
    }
    
}