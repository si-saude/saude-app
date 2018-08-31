import { Router } from '@angular/router';
import { Headers, Http } from '@angular/http';
import { Injectable, EventEmitter } from '@angular/core';

import { GlobalVariable } from './../global';
import { Tarefa } from './../model/tarefa';
import { UsuarioService } from './../controller/usuario/usuario.service';
import { ServicoService } from './../controller/servico/servico.service';
import { GerenciaService } from './../controller/gerencia/gerencia.service';
import { EmpregadoService } from './../controller/empregado/empregado.service';
import { GheService } from './../controller/ghe/ghe.service';
import { GheeService } from './../controller/ghee/ghee.service';
import { CargoService } from './../controller/cargo/cargo.service';
import { FuncaoService } from './../controller/funcao/funcao.service';
import { RegimeService } from './../controller/regime/regime.service';
import { BaseService } from './../controller/base/base.service';
import { TipoSolicitacaoService } from './../controller/tipo-solicitacao/tipo-solicitacao.service';
import { EquipeService } from './../controller/equipe/equipe.service';
 
@Injectable()
export class SolicitacaoServicoService {
    protected headers: Headers;
    protected URL: string;
    
    constructor( protected http: Http, protected router: Router,
            private usuarioService: UsuarioService,
            private servicoService: ServicoService,
            private gerenciaService: GerenciaService,
            private gheService: GheService,
            private cargoService: CargoService,
            private funcaoService: FuncaoService,
            private regimeService: RegimeService,
            private gheeService: GheeService,
            private baseService: BaseService,
            private empregadoService: EmpregadoService,
            private tipoSolicitacaoService: TipoSolicitacaoService,
            private equipeService: EquipeService) {
        this.headers = new Headers( { 'Content-Type': 'application/json' } );
        this.headers.append('Authorization', 'Bearer '+localStorage.getItem('token'));
        this.URL = GlobalVariable.BASE_API_URL;
    }
    
    getEmpregado( empregadoFilter ) {
        let urlEmpregado = this.URL + "/empregado/list-eq";
        return this.http
            .post( urlEmpregado, empregadoFilter, { headers: this.headers } )
            .toPromise();
    }
    
    getEmpregadoByChave( empregadoFilter ) {
        return this.empregadoService.selectList( empregadoFilter );
    }
    
    getServicos( servicoFilter ) {
        return this.servicoService.selectList( servicoFilter );
    }
    
    getUsuario( id: number ) {
        return this.usuarioService.get(id);
    }
    
    getGerencia( gerenciaFilter ) {
        return this.gerenciaService.list( gerenciaFilter );
    }
    
    registrarAtendimento( atendimento ) {
        let urlSolicitacao = this.URL + "/atendimento/registrar-solicitacao-atendimento";
        return this.http
            .post( urlSolicitacao, atendimento, { headers: this.headers } )
            .toPromise();
    }
    
    registrarExamePericial( atendimento ) {
        let urlSolicitacao = this.URL + "/atendimento/registrar-solicitacao-exame-pericial";
        return this.http
            .post( urlSolicitacao, atendimento, { headers: this.headers } )
            .toPromise();
    }
    
    registrarMudancaFuncao( mudancaFuncao ) {
        let urlMudancaFuncao = this.URL + "/mudanca-funcao/registrar-mudanca-funcao";
        return this.http
            .post( urlMudancaFuncao, mudancaFuncao, { headers: this.headers } )
            .toPromise();
    }
    
    registrarSolicitacao( solicitacao ) {
        let urlSolicitacao = this.URL + "/solicitacao-central-integra/registrar-solicitacao";
        return this.http
            .post( urlSolicitacao, solicitacao, { headers: this.headers } )
            .toPromise();
    }
    
    getTipoSolicitacoes() {
        return this.tipoSolicitacaoService.getTipoSolicitacoes();
    }
    
    getEmpregadoService() {
        return this.empregadoService;
    }
    
    registrarAtestado( atestado ) {
        let urlAtestado = this.URL + "/atestado/registrar-atestado"
        return this.http
            .post( urlAtestado, atestado, { headers: this.headers } )
            .toPromise();
    }
    
    getGheService() {
        return this.gheService;
    }
    
    getGerenciaService() {
        return this.gerenciaService;
    }
    
    getCargoService() {
        return this.cargoService;
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
    
    getEquipeMedicinaOdonto() {
        let urlEquipe = this.URL + "/equipe/get-medicina-odonto"
        return this.http
            .get( urlEquipe, { headers: this.headers } )
            .toPromise();
    }
    
}