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
import { UsuarioService } from './../usuario/usuario.service';
import { EquipeService } from './../equipe/equipe.service';
import { GenericService } from './../../generics/generic.service';
import { InterfaceServiceReport } from './../../interfaces/interface.service.report';

@Injectable()
export class SolicitacaoCentralIntegraService extends GenericService implements InterfaceServiceReport {

    constructor( http: Http, router: Router,
            private usuarioService: UsuarioService,
            private equipeService: EquipeService,
            private tipoSolicitacaoService: TipoSolicitacaoService,
            private empregadoService: EmpregadoService,
            private profissionalSaudeService: ProfissionalSaudeService ) { 
        super( http, router, "solicitacao-central-integra" );
    }
    
    getUsuario(id) {
        return this.usuarioService.get(id);
    }
    
    getProfissional( profissionalFilter ) {
        return this.profissionalSaudeService.list( profissionalFilter );
    }
    
    getEquipe( id ) {
        return this.equipeService.get(id);
    }
    
    getSolicitacoes( solicitacaoCentralIntegraFilter: SolicitacaoCentralIntegraFilter ) {
        return this.list( solicitacaoCentralIntegraFilter );
    }
    
    getEntities() {
        let urlSolicitacoesCentralIntegra = this.URL + "/get-solicitacoes-central-integra";
        return this.http
            .get( urlSolicitacoesCentralIntegra + "?cpf=" + 0, { headers: this.headers } )
            .toPromise();
    }
    
    getSolicitacoesReport( cpf ) {
        let urlSolicitacoesCentralIntegra = this.URL + "/get-solicitacoes-central-integra";
        return this.http
            .get( urlSolicitacoesCentralIntegra + "?cpf=" + cpf, { headers: this.headers } )
            .toPromise();
    }
    
    exportFile( array ) {
        let urlFile = this.URL + "/get-file";
        return this.http
            .post( urlFile, array, { headers: this.headers } )
            .toPromise();
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
    
    getAnexo( id: number ) {
        let urlGetAnexo = GlobalVariable.BASE_API_URL + "/solicitacao-central-integra/get-anexo";
        return this.http
            .post( urlGetAnexo, id, { headers: this.headers } )
            .toPromise();
    }
    
    public getEmpregadoService(){
        return this.empregadoService;
    }
    
    public getProfissionalService(){
        return this.profissionalSaudeService;
    }
    
}