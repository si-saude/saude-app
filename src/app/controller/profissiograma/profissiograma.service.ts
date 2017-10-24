import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { GlobalVariable } from './../../global';
import { Profissiograma } from './../../model/profissiograma';
import { ProfissiogramaFilter } from './profissiograma.filter';
import { GrupoMonitoramentoService } from './../grupo-monitoramento/grupo-monitoramento.service';
import { GenericService } from './../../generics/generic.service';

@Injectable()
export class ProfissiogramaService extends GenericService {

    constructor( http: Http, router: Router,
            private grupoMonitoramentoService: GrupoMonitoramentoService) { 
        super(http, router, "profissiograma");
    }

    getGruposMonitoramento() {
        return this.grupoMonitoramentoService.getGruposMonitoramento();
    }
    
}