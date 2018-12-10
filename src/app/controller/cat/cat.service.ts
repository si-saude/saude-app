import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { GlobalVariable } from './../../global';
import { CatFilter } from './cat.filter';
import { GenericService } from './../../generics/generic.service';
import { CargoService } from './../cargo/cargo.service';
import { GerenciaService } from './../gerencia/gerencia.service';
import { EmpregadoService } from './../empregado/empregado.service';
import { EmpresaService } from './../empresa/empresa.service';
import { FuncaoService } from './../funcao/funcao.service';
import { ProfissionalSaudeService } from './../profissional-saude/profissional-saude.service';
import { ClassificacaoAfastamentoService } from './../classificacao-afastamento/classificacao-afastamento.service';
import { DiagnosticoService } from './../diagnostico/diagnostico.service';
import { AgenteCausadorService } from './../agente-causador/agente-causador.service';
import { NaturezaLesaoService } from './../natureza-lesao/natureza-lesao.service';
import { ParteCorpoAtingidaService } from './../parte-corpo-atingida/parte-corpo-atingida.service';
import { CidadeService } from './../cidade/cidade.service';
import { UsuarioService } from './../usuario/usuario.service';
import { InstalacaoService } from './../instalacao/instalacao.service';
import { CnaeService } from './../cnae/cnae.service';
import { ClassificacaoGravidadeService } from './../classificacao-gravidade/classificacao-gravidade.service';
import { ExameService } from './../exame/exame.service';
import { FeriadoService } from './../feriado/feriado.service';

@Injectable()
export class CatService extends GenericService {

    constructor( http: Http, router: Router,
            private cargoService: CargoService,
            private gerenciaService: GerenciaService,
            private empregadoService: EmpregadoService,
            private empresaService: EmpresaService,
            private funcaoService: FuncaoService,
            private profissionalSaudeService: ProfissionalSaudeService,
            private classificacaoAfastamentoService: ClassificacaoAfastamentoService,
            private diagnosticoService: DiagnosticoService,
            private agenteCausadorService: AgenteCausadorService,
            private naturezaLesaoService: NaturezaLesaoService,
            private parteCorpoAtingidaService: ParteCorpoAtingidaService,
            private cidadeService: CidadeService,
            private usuarioService: UsuarioService,
            private instalacaoService: InstalacaoService,
            private cnaeService: CnaeService,
            private classificacaoGravidadeService: ClassificacaoGravidadeService,
            private exameService: ExameService,
            private feriadoService: FeriadoService) {
        super(http,router,"cat");
    }
    
    getCats() {
        return this.selectList(new CatFilter());
    }
    
    getCargoService() {
        return this.cargoService;
    }
    
    getFuncaoService() {
        return this.funcaoService;
    }
    
    getGerenciaService() {
        return this.gerenciaService;
    }
    
    getEmpregadoService() {
        return this.empregadoService;
    }
    
    getEmpresaService() {
        return this.empresaService;
    }
    
    getProfissionalService() {
        return this.profissionalSaudeService;
    }
    
    getClassificacaoService() {
        return this.classificacaoAfastamentoService;
    }
    
    getDiagnosticoService() {
        return this.diagnosticoService;
    }
    
    getNaturezaLesaoService() {
        return this.naturezaLesaoService;
    }
    
    getAgenteCausadorService() {
        return this.agenteCausadorService;
    }
    
    getParteCorpoAtingidaService() {
        return this.parteCorpoAtingidaService;
    }
    
    getCidadeService() {
        return this.cidadeService;
    }
    
    getInstalacaoService() {
        return this.instalacaoService;
    }
    
    getCnaeService() {
        return this.cnaeService;
    }
    
    getClassificacaoGravidadeService() {
        return this.classificacaoGravidadeService;
    }
    
    getUsuarioService() {
        return this.usuarioService;
    }
    
    getExameService() {
        return this.exameService;
    }
    
    getFeriadoService() {
        return this.feriadoService;
    }
    
    getNexoCausais() {
        let urlNexoCausais =  GlobalVariable.BASE_API_URL + "/generic/ensaio-vedacao";
        return this.http
            .get( urlNexoCausais + "?filter=", { headers: this.headers } )
            .toPromise();
    }
    
    getEscolaridades() {
        let urlEscolaridades = GlobalVariable.BASE_API_URL + "/generic/escolaridade";
        return this.http
            .get( urlEscolaridades + "?filter=", { headers: this.headers } )
            .toPromise();
    }
    
    getEstadosCivis() {
        let urlEstadosCivis = GlobalVariable.BASE_API_URL + "/generic/estado-civil";
        return this.http
            .get( urlEstadosCivis + "?filter=", { headers: this.headers } )
            .toPromise();
    }
    
    getSexos() {
        let urlSexos = GlobalVariable.BASE_API_URL + "/generic/sexo";
        return this.http
            .get( urlSexos + "?filter=", { headers: this.headers } )
            .toPromise();
    }
    
    getTipoAcidentes() {
        let urlTipoAcidente = GlobalVariable.BASE_API_URL + "/generic/tipo-acidente";
        return this.http
            .get( urlTipoAcidente + "?filter=", { headers: this.headers } )
            .toPromise();
    }
    
    getTipoCats() {
        let urlTipoCat = GlobalVariable.BASE_API_URL + "/generic/tipo-cat";
        return this.http
            .get( urlTipoCat + "?filter=", { headers: this.headers } )
            .toPromise();
    }
    
    getVinculos() {
        let urlVinculos = GlobalVariable.BASE_API_URL + "/generic/vinculo-empregado";
        return this.http
            .get( urlVinculos + "?filter=", { headers: this.headers } )
            .toPromise();
    }
    
    getComunicacaoOcorrencia( cat ) {
        let urlComunicacaoOcorrencia = this.URL + "/comunicacao-ocorrencia";
        return this.http
            .post( urlComunicacaoOcorrencia, cat, { headers: this.headers } )
            .toPromise();
    }
    
    getConformeNaoConforme() {
        let urlConfomeNaoConforme = GlobalVariable.BASE_API_URL + "/generic/conforme-nao-conforme";
        return this.http
            .get( urlConfomeNaoConforme + "?filter=", { headers: this.headers } )
            .toPromise();
    }
    
    getAplicavelNaoAplicavel() {
        let urlAplicavelNaoAplicavel = GlobalVariable.BASE_API_URL + "/generic/aplicavel-nao-aplicavel";
        return this.http
            .get( urlAplicavelNaoAplicavel + "?filter=", { headers: this.headers } )
            .toPromise();
    }
    
    getDentroForaPrazo() {
        let urlDentroForaPrazo = GlobalVariable.BASE_API_URL + "/generic/dentro-fora-prazo";
        return this.http
            .get( urlDentroForaPrazo + "?filter=", { headers: this.headers } )
            .toPromise();
    }
    
    getSimNao() {
        let urlSimNao = GlobalVariable.BASE_API_URL + "/generic/status-sim-nao";
        return this.http
            .get( urlSimNao + "?filter=", { headers: this.headers } )
            .toPromise();
    }
}