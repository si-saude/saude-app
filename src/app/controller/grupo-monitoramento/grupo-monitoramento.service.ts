import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { TipoGrupoMonitoramentoService } from './../tipo-grupo-monitoramento/tipo-grupo-monitoramento.service';
import { ExameService } from './../exame/exame.service';
import { CriterioService } from './../criterio/criterio.service';
import { GrupoMonitoramentoFilter } from './grupo-monitoramento.filter';
import { GlobalVariable } from './../../global';
import { GenericService } from './../../generics/generic.service';

@Injectable()
export class GrupoMonitoramentoService extends GenericService {
    
    constructor( http: Http, router: Router,
            private tipoGrupoMonitoramentoService: TipoGrupoMonitoramentoService,
            private criterioService: CriterioService,
            private exameService: ExameService) { 
        super( http, router, "grupo-monitoramento" );
    }
    
    getGruposMonitoramento() {
        return this.selectList(new GrupoMonitoramentoFilter());
    }
    
    getGrupoMonitoramentoById(id) {
        return this.get(id);
    }
    
    getTiposGrupoMonitoramento() {
        return this.tipoGrupoMonitoramentoService.getTiposGrupoMonitoramento();
    }
    
    getExames() {
        return this.exameService.getExames();
    }
    
    getCriterios() {
        return this.criterioService.getCriterios();
    }
    
    getCriterioById(id: number) {
        return this.criterioService.get(id);
    }
        
}