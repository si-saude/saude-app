import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { GlobalVariable } from './../../global';
import { MudancaFuncao } from './../../model/mudanca-funcao';
import { MudancaFuncaoFilter } from './mudanca-funcao.filter';
import { GenericService } from './../../generics/generic.service';
import { GerenciaService } from './../gerencia/gerencia.service';
import { EmpregadoService } from './../empregado/empregado.service';
import { GheService } from './../ghe/ghe.service';
import { GheeService } from './../ghee/ghee.service';
import { EnfaseService } from './../enfase/enfase.service';
import { FuncaoService } from './../funcao/funcao.service';
import { RegimeService } from './../regime/regime.service';
import { BaseService } from './../base/base.service';
import { ProfissionalSaudeService } from './../profissional-saude/profissional-saude.service';
import { UsuarioService } from './../usuario/usuario.service';

@Injectable()
export class MudancaFuncaoService extends GenericService {

    constructor( http: Http, router: Router,
                private usuarioService: UsuarioService,
                private profissionalService: ProfissionalSaudeService,
                private gerenciaService: GerenciaService,
                private gheService: GheService,
                private enfaseService: EnfaseService,
                private funcaoService: FuncaoService,
                private regimeService: RegimeService,
                private gheeService: GheeService,
                private baseService: BaseService,
                private empregadoService: EmpregadoService) { 
        super(http,router,"mudanca-funcao");
    }
    
    
    getUsuario( id: number ) {
        return this.usuarioService.get( id );
    }
    
    getProfissional( profissionalFilter ) {
        return this.profissionalService.list( profissionalFilter );
    }
    
    
    getMudancaFuncaos() {
        return this.selectList(new MudancaFuncaoFilter());
    }
    
    getStatus() {
        let urlStatus = GlobalVariable.BASE_API_URL + "/generic/status-tarefa";
        return this.http
            .get( urlStatus + "?filter=", { headers: this.headers } )
            .toPromise();
    }
    
    solicitarConvocacao( mudancafuncao ) {
        let urlSolicitarConvocacao = this.URL + "/solicitar-convocacao";
        return this.http
            .post( urlSolicitarConvocacao, mudancafuncao, { headers: this.headers } )
            .toPromise();
    }
    
    aplicarAlteracoes( mudancafuncao ) {
        let urlaplicarAlteracao = this.URL + "/aplicar-alteracoes";
        return this.http
            .post( urlaplicarAlteracao, mudancafuncao, { headers: this.headers } )
            .toPromise();
    }
 
    getEmpregadoService() {
        return this.empregadoService;
    }
    
    getGheService() {
        return this.gheService;
    }
    
    getGerenciaService() {
        return this.gerenciaService;
    }
    
    getEnfaseService() {
        return this.enfaseService;
    }
    
    getFuncaoService() {
        return this.funcaoService;
    }
    
    getGheeService() {
        return this.gheeService;
    }
    
    getBaseService() {
        return this.baseService;
    }
    
    getRegimes() {
        return this.regimeService.getRegimes();
    }    
}