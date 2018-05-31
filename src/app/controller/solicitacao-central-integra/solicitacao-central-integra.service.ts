import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { GlobalVariable } from './../../global';
import { SolicitacaoCentralIntegra } from './../../model/solicitacao-central-integra';
import { SolicitacaoCentralIntegraFilter } from './solicitacao-central-integra.filter';
import { TipoSolicitacaoService } from './../tipo-solicitacao/tipo-solicitacao.service';
import { EmpregadoService } from './../empregado/empregado.service';
import { EmpregadoFilter } from './../empregado/empregado.filter';
import { ProfissionalSaudeService } from './../profissional-saude/profissional-saude.service';
import { ProfissionalSaudeFilter } from './../profissional-saude/profissional-saude.filter';
import { GenericService } from './../../generics/generic.service';

@Injectable()
export class SolicitacaoCentralIntegraService extends GenericService {

    constructor( http: Http, router: Router,
            private tipoSolicitacaoService: TipoSolicitacaoService,
            private empregadoService: EmpregadoService,
            private profissionalSaudeService: ProfissionalSaudeService ) { 
        super( http, router, "solicitacao-central-integra" );
    }
    
    getSolicitacoes() {
        return this.selectList(new SolicitacaoCentralIntegraFilter());
    }
    
    getTipoSolicitacoes() {
        return this.tipoSolicitacaoService.getTipoSolicitacoes();
    }
    
    getStatusSolicitacao() {
        let urlGrupo = GlobalVariable.BASE_API_URL + "/generic/status-solicitacao";
        return this.http
            .get( urlGrupo + "?filter=", { headers: this.headers } )
            .toPromise();
    }
    
    getEmpregados( empregadoFilter: EmpregadoFilter ) {
        return this.empregadoService.list( empregadoFilter );
    }
    
    getProfissionais( profissionalFilter: ProfissionalSaudeFilter ) {
        return this.profissionalSaudeService.list( profissionalFilter );
    }
    
    getEmpregadoByName( evento ) {
        return this.empregadoService.getEmpregadoByName( evento );
    }
    
    getEmpregadoByChave( evento ) {
        return this.empregadoService.getEmpregadoByChave( evento );
    }
}