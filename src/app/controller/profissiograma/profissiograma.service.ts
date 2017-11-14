import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { GlobalVariable } from './../../global';
import { Profissiograma } from './../../model/profissiograma';
import { ProfissiogramaFilter } from './profissiograma.filter';
import { GrupoMonitoramentoService } from './../grupo-monitoramento/grupo-monitoramento.service';
import { ExameService } from './../exame/exame.service';
import { CriterioService } from './../criterio/criterio.service';
import { GenericService } from './../../generics/generic.service';

@Injectable()
export class ProfissiogramaService extends GenericService {

    constructor( http: Http, router: Router,
            private grupoMonitoramentoService: GrupoMonitoramentoService,
            private exameService: ExameService,
            private criterioService: CriterioService) { 
        super(http, router, "profissiograma");
    }

    getGruposMonitoramento() {
        return this.grupoMonitoramentoService.getGruposMonitoramento();
    }
    
    getGrupoMonitoramentoById(id: number) {
        return this.grupoMonitoramentoService.getGrupoMonitoramentoById(id);
    }
    
    getExames() {
        return this.exameService.getExames();
    }
    
    getCriterios() {
        return this.criterioService.getCriterios();
    }
    
    getProfissiogramas() {
        let profissiogramaFilter: ProfissiogramaFilter = new ProfissiogramaFilter();
        return this.selectList(profissiogramaFilter);
    }
    
}