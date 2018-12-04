import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { GlobalVariable } from './../../global';
import { RiscoPotencial } from './../../model/risco-potencial';
import { RiscoPotencialFilter } from './risco-potencial.filter';
import { GenericService } from './../../generics/generic.service';
import { DiagnosticoService } from './../diagnostico/diagnostico.service';
import { IntervencaoService } from './../intervencao/intervencao.service';
import { EmpregadoService } from './../empregado/empregado.service';
import { EquipeService } from './../equipe/equipe.service';
import { ProfissionalSaudeService } from './../profissional-saude/profissional-saude.service';
import { UsuarioService } from './../usuario/usuario.service';
import { BaseService } from './../base/base.service';
import { BaseFilter } from './../base/base.filter';
import { IndicadorSastService } from './../indicador-sast/indicador-sast.service';
import { IndicadorSastFilter } from './../indicador-sast/indicador-sast.filter';
import { EquipeFilter } from './../equipe/equipe.filter';
import { AcaoIntervencaoService } from './../acao-intervencao/acao-intervencao.service';
import { EixoService } from './../eixo/eixo.service';

@Injectable()
export class RiscoPotencialService extends GenericService {

    constructor( http: Http, router: Router,
            private usuarioService: UsuarioService,
            private profissionalService: ProfissionalSaudeService,
            private empregadoService: EmpregadoService,
            private diagnosticoService: DiagnosticoService,
            private intervencaoService: IntervencaoService,
            private equipeService: EquipeService,
            private indicadorSastService: IndicadorSastService,
            private acaoIntervencaoService: AcaoIntervencaoService,
            private baseService: BaseService,
            private eixoService: EixoService ) { 
        super(http,router,"risco-potencial");
    }
    
    getUfs() {
        return this.baseService.getUfs();
    }
    getAcaoIntervencaoService(){        
        return this.acaoIntervencaoService;
    }
    
    getIndicadorSastService(){        
        return this.indicadorSastService;
    }
    
    getUsuario( id: number ) {
        return this.usuarioService.get( id );
    }
    
    getProfissional( profissionalFilter ) {
        return this.profissionalService.list( profissionalFilter );
    }
    
    getRiscos() {
        return this.selectList(new RiscoPotencialFilter());
    }
    
    getAcoes(id) {
        let urlGetAcoes = this.URL + "/get-acoes";
        return this.http
            .get( urlGetAcoes + "?id=" + id, { headers: this.headers } )
            .toPromise();
    }
    
    validar( riscoPotencial ) {
        let urlValidar = this.URL + "/validar";
        return this.http
            .post( urlValidar, riscoPotencial, { headers: this.headers } )
            .toPromise();
    }
    
    criarPlano( riscoPotencial ) {
        let urlCriarPlano = this.URL + "/criar-plano";
        return this.http
            .post( urlCriarPlano, riscoPotencial, { headers: this.headers } )
            .toPromise();
    }
    
    saveAcoes( riscoPotencial ) {
        let urlSaveAcoes = this.URL + "/save-acoes";
        return this.http
            .post( urlSaveAcoes, riscoPotencial, { headers: this.headers } )
            .toPromise();
    }
    
    saveAcompanhamentos( riscoPotencial ) {
        let urlSaveAcompanhamentos = this.URL + "/save-acompanhamentos";
        return this.http
            .post( urlSaveAcompanhamentos, riscoPotencial, { headers: this.headers } )
            .toPromise();
    }
    
    listAll( filter: RiscoPotencialFilter) {
        let urlList = this.URL + "/list-all";
        return this.http
            .post( urlList, filter, { headers: this.headers } )
            .toPromise();
    }
    
    getTipoAcao( filter: RiscoPotencialFilter) {
        let urlTipoAcao = GlobalVariable.BASE_API_URL + "/generic/tipo-acao";
        return this.http
            .get( urlTipoAcao + "?filter=", { headers: this.headers } )
            .toPromise();
    }
    
    getStatusAcao( filter: RiscoPotencialFilter) {
        let urlStatusAcao = GlobalVariable.BASE_API_URL + "/generic/status-acao";
        return this.http
            .get( urlStatusAcao + "?filter=", { headers: this.headers } )
            .toPromise();
    }
    
    getTipoContatoAcao( filter: RiscoPotencialFilter) {
        let urlTipoContato = GlobalVariable.BASE_API_URL + "/generic/tipo-contato";
        return this.http
            .get( urlTipoContato + "?filter=", { headers: this.headers } )
            .toPromise();
    }
    
    getPrazos() {
        let urlPrazo = GlobalVariable.BASE_API_URL + "/generic/prazo-em-meses";
        return this.http
            .get( urlPrazo + "?filter=", { headers: this.headers } )
            .toPromise();
    }
    
    getStatusRiscoPotencial() {
        let urlRiscoPotencial = GlobalVariable.BASE_API_URL + "/generic/status-risco-potencial";
        return this.http
            .get( urlRiscoPotencial + "?filter=", { headers: this.headers } )
            .toPromise();
    }
    
    getStatusRPSat() {
        let urlRiscoPotencial = GlobalVariable.BASE_API_URL + "/generic/status-rpsat";
        return this.http
            .get( urlRiscoPotencial + "?filter=", { headers: this.headers } )
            .toPromise();
    }
    
    getEquipes( ) {
        return this.equipeService.selectList(new EquipeFilter());
    }
    
    getDiagnosticoByDescricaoAndAbreviacao( descricao, abreviacaoEquipe ) {
        return this.diagnosticoService.getDiagnosticoByDescricaoAndAbreviacao(descricao, abreviacaoEquipe);
    }
    
    getDiagnosticoByCodigoAndAbreviacao( codigo, abreviacaoEquipe ) {
        return this.diagnosticoService.getDiagnosticoByCodigoAndAbreviacao(codigo, abreviacaoEquipe);
    }
    
    getIntervencaoByDescricaoAndAbreviacao( descricao, abreviacaoEquipe ) {
        return this.intervencaoService.getIntervencaoByDescricaoAndAbreviacao(descricao, abreviacaoEquipe);
    }
    
    getEquipeAbordagemByName( nome ) {
        return this.equipeService.getEquipeByName(nome);
    }
    
    getStatusSimNao() {
        let urlStatusSimNao = GlobalVariable.BASE_API_URL + "/generic/status-sim-nao";
        return this.http
            .get( urlStatusSimNao + "?filter=", { headers: this.headers } )
            .toPromise();
    }
    
    getEnums( path ) {
        let urlEnums = GlobalVariable.BASE_API_URL + "/generic/"+path;
        return this.http
            .get( urlEnums + "?filter=", { headers: this.headers } )
            .toPromise();
    }
    
    getRiscoPotenciais( uf, equipeId ) {
        let urlRiscoPotenciais = this.URL + "/get-risco-potenciais";
        return this.http
            .get( urlRiscoPotenciais + "?uf=" + uf + "&equipeId=" + equipeId, { headers: this.headers } )
            .toPromise();
    }
    
    exportFile( array ) {
        let urlFile = this.URL + "/get-file";
        return this.http
            .post( urlFile, array, { headers: this.headers } )
            .toPromise();
    }
    getEixosByEquipe( idEquipe ) {
        return this.eixoService.getEixosByEquipe( idEquipe );
     }
    
    getDiagnosticoByEixo( idEixo, idEquipe ) {
        return this.diagnosticoService.getDiagnosticoByEixo( idEixo, idEquipe );
    }
    
    getIntervencoesByEquipe( idEquipe ) {
        return this.intervencaoService.getIntervencoesByEquipe( idEquipe );
    }
    
}