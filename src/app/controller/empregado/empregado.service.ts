import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { GlobalVariable } from './../../global';
import { Empregado } from './../../model/empregado';
import { EmpregadoFilter } from './empregado.filter';
import { CargoService } from './../cargo/cargo.service';
import { FuncaoService } from './../funcao/funcao.service';
import { RegimeService } from './../regime/regime.service';
import { GerenciaService } from '../gerencia/gerencia.service';
import { BaseService } from './../base/base.service';
import { GheService } from './../ghe/ghe.service';
import { GheeService } from './../ghee/ghee.service';
import { InstalacaoService } from './../instalacao/instalacao.service';
import { VacinaService } from './../vacina/vacina.service';
import { GrupoMonitoramentoService } from './../grupo-monitoramento/grupo-monitoramento.service';
import { GenericService } from './../../generics/generic.service';

@Injectable()
export class EmpregadoService extends GenericService {

    constructor( http: Http, router: Router, 
            private cargoService: CargoService,
            private funcaoService: FuncaoService,
            private regimeService: RegimeService,
            private gerenciaService: GerenciaService,
            private baseService: BaseService,
            private gheService: GheService,
            private gheeService: GheeService,
            private instalacaoService: InstalacaoService,
            private vacinaService: VacinaService,
            private grupoMonitoramentoService: GrupoMonitoramentoService) { 
        super(http, router, "empregado");
    }
    
    getEmpregados() {
        return this.selectList(new EmpregadoFilter());
    }
    
    getEmpregadoByName(nome: string) {
        let empregadoFilter: EmpregadoFilter = new EmpregadoFilter();
        empregadoFilter.setNome(nome);
        
        return this.selectList(empregadoFilter);
    }

    getStatuses() {
        let urlStatuses = GlobalVariable.BASE_API_URL + "/generic/status-empregado";
        return this.http
            .get( urlStatuses + "?filter=", { headers: this.headers } )
            .toPromise();
    }
    
    getSexos() {
        let urlStatuses = GlobalVariable.BASE_API_URL + "/generic/sexo";
        return this.http
            .get( urlStatuses + "?filter=", { headers: this.headers } )
            .toPromise();
    }
    
    getCargos() {
        return this.cargoService.getCargos();
    }
    
    getFuncoes() {
        return this.funcaoService.getFuncoes();
    }
    
    getRegimes() {
        return this.regimeService.getRegimes();
    }
    
    getGerencias() {
        return this.gerenciaService.getGerencias();
    }
    
    getBases() {
        return this.baseService.getBases();
    }
    
    getGhes() {
        return this.gheService.getGhes();
    }
    
    getGhees() {
        return this.gheeService.getGhees();
    }
    
    getInstalacoes() {
        return this.instalacaoService.getInstalacoes();
    }
    
    getGruposMonitoramento() {
        return this.grupoMonitoramentoService.getGruposMonitoramento();
    }
    
    getVacinas() {
        return this.vacinaService.getVacinas();
    }
    
    getGrupoMonitoramentoById(id) {
        return this.grupoMonitoramentoService.getGrupoMonitoramentoById(id);
    }
    
}