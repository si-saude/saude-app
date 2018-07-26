import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { GlobalVariable } from '../../global';
import { Atestado } from '../../model/atestado';
import { AtestadoFilter } from './atestado.filter';
import { GenericService } from '../../generics/generic.service';
import { EmpregadoService } from './../empregado/empregado.service';
import { CatService } from './../cat/cat.service';
import { DiagnosticoService } from './../diagnostico/diagnostico.service';
import { ProfissionalSaudeService } from './../profissional-saude/profissional-saude.service';

@Injectable()
export class AtestadoService extends GenericService {

    constructor( http: Http, router: Router,
            private empregadoService: EmpregadoService,
            private catService: CatService,
            private diagnosticoService: DiagnosticoService,
            private profissionalService: ProfissionalSaudeService) { 
        super(http,router,"atestado");
    }
    
    getAtestados() {
        return this.selectList(new AtestadoFilter());
    }
    
    getStatuses() {
        let urlStatuses = GlobalVariable.BASE_API_URL + "/generic/status-atestado";
        return this.http
            .get( urlStatuses + "?filter=", { headers: this.headers } )
            .toPromise();
    }
    
    getAnexo( id: number ) {
        let urlGetAnexo = GlobalVariable.BASE_API_URL + "/atestado/get-anexo";
        return this.http
            .post( urlGetAnexo, id, { headers: this.headers } )
            .toPromise();
    }
    
    getSituacaoEmpregado() {
        let urlSituacaoEmpregado = GlobalVariable.BASE_API_URL + "/generic/situacao-empregado";
        return this.http
            .get( urlSituacaoEmpregado+"?filter=", { headers: this.headers } )
            .toPromise();
    }
    
    getEmpregadoService() {
        return this.empregadoService;
    }
    
    getCatService() {
        return this.catService;
    }
    
    getDiagnosticoService() {
        return this.diagnosticoService;
    }
    
    getProfissionalService() {
        return this.profissionalService;
    }
    
}