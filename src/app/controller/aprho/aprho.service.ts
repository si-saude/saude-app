import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { GlobalVariable } from './../../global';
import { Aprho } from './../../model/aprho';
import { AprhoFilter } from './aprho.filter';
import { GenericService } from './../../generics/generic.service';
import { GheService } from './../ghe/ghe.service';
import { FonteGeradoraService } from './../fonte-geradora/fonte-geradora.service';
import { AgenteRiscoService } from './../agente-risco/agente-risco.service';
import { CategoriaRiscoService } from './../categoria-risco/categoria-risco.service';
import { PossivelDanoSaudeService } from './../possivel-dano-saude/possivel-dano-saude.service';
import { EmpregadoService } from './../empregado/empregado.service';

@Injectable()
export class AprhoService extends GenericService {

    constructor( http: Http, router: Router,
                 private gheService: GheService,
                 private categoriaRiscosService: CategoriaRiscoService, 
                 private fonteGeradoraService: FonteGeradoraService, 
                 private agenteRiscoService: AgenteRiscoService, 
                 private possivelDanoSaudeService: PossivelDanoSaudeService,
                 private empregadoService: EmpregadoService) { 
        super(http,router,"aprho");
    }
    
    getAprhos() {
        return this.selectList(new AprhoFilter());
    }    
    
    getGhes() {
        return this.gheService.getGhes();
    } 
    
    getGhesAtivos(filter) {
        return this.gheService.getGhesAtivos(filter);
    }
    
    getMeioPropagacoes() {
        let urlMeioPropagacao = GlobalVariable.BASE_API_URL + "/generic/meio-propagacao";
        return this.http
            .get( urlMeioPropagacao + "?filter=", { headers: this.headers } )
            .toPromise();
    }
    
    getMedidaControles() {
        let urlMedidaControle = GlobalVariable.BASE_API_URL + "/generic/medida-controle";
        return this.http
            .get( urlMedidaControle + "?filter=", { headers: this.headers } )
            .toPromise();
    }   
    getCategoriaRiscos() {
        return this.categoriaRiscosService.getCategoriaRiscos();
    }    
    
    getGheService() {
        return this.gheService;
    }
    
    
    getFonteGeradoraService() {
        return this.fonteGeradoraService;
    }
    
    getAgenteRiscoService() {
        return this.agenteRiscoService;
    }
    
    getPossivelDanoSaudeService() {
        return this.possivelDanoSaudeService;
    }
    
    getEmpregadoService() {
        return this.empregadoService;
    }
   
}