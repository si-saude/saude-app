import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { GlobalVariable } from './../../global';
import { Cat } from './../../model/cat';
import { CatFilter } from './cat.filter';
import { GenericService } from './../../generics/generic.service';
import { EixoService } from './../eixo/eixo.service';
import { DiagnosticoService } from './../diagnostico/diagnostico.service';
import { ParteCorpoAtingidaService } from './../parte-corpo-atingida/parte-corpo-atingida.service';
import { AgenteCausadorService } from './../agente-causador/agente-causador.service';
import { NaturezaLesaoService } from './../natureza-lesao/natureza-lesao.service';
import { BaseService } from './../base/base.service';

@Injectable()
export class CatService extends GenericService {

    constructor( http: Http, router: Router,
            private baseService: BaseService,
            private eixoService: EixoService,
            private diagnosticoService: DiagnosticoService,
            private parteCorpoAtingidaService: ParteCorpoAtingidaService,
            private agenteCausadorService: AgenteCausadorService,
            private naturezaLesaoService: NaturezaLesaoService) { 
        super(http,router,"cat");
    }
    
    getCats() {
        return this.selectList(new CatFilter());
    }
    
    getSexos() {
        let urlSexos = GlobalVariable.BASE_API_URL + "/generic/sexo";
        return this.http
            .get( urlSexos + "?filter=", { headers: this.headers } )
            .toPromise();
    }
    
    getPartesCorpo() {
        let urlPartesCorpo = GlobalVariable.BASE_API_URL + "/generic/partes-corpo";
        return this.http
            .get( urlPartesCorpo + "?filter=", { headers: this.headers } )
            .toPromise();
    }
    
    getGravidades() {
        let urlGravidades = GlobalVariable.BASE_API_URL + "/generic/gravidade";
        return this.http
            .get( urlGravidades + "?filter=", { headers: this.headers } )
            .toPromise();
    }
    
    getTipoAcidentes() {
        let urlTipoAcidentes = GlobalVariable.BASE_API_URL + "/generic/tipo-acidente";
        return this.http
            .get( urlTipoAcidentes + "?filter=", { headers: this.headers } )
            .toPromise();
    }
    
    getTipoCats() {
        let urlTipoCats = GlobalVariable.BASE_API_URL + "/generic/tipo-cat";
        return this.http
            .get( urlTipoCats + "?filter=", { headers: this.headers } )
            .toPromise();
    }
    
    getEixosByEquipe( idEquipe ) {
        return this.eixoService.getEixos();
    }
    
    getDiagnosticoByEixo( idEixo, idEquipe ) {
        return this.diagnosticoService.getDiagnosticoByEixoWithoutEquipe(idEixo)
    }
    
    getParteCorpoAtingidaService() {
        return this.parteCorpoAtingidaService;
    }
    
    getAgenteCausadorService() {
        return this.agenteCausadorService;
    }
    
    getNaturezaLesaoService() {
        return this.naturezaLesaoService;
    }
    
    getBases() {
        return this.baseService.getBases();
    }
}