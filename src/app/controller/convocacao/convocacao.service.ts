import { Router } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { GenericService } from './../../generics/generic.service';
import { Convocacao } from './../../model/convocacao';
import { ConvocacaoFilter } from './convocacao.filter';
import { ProfissiogramaService } from './../profissiograma/profissiograma.service';
import { ExameService } from './../exame/exame.service';
import { EmpregadoService } from './../empregado/empregado.service';
import { GlobalVariable } from './../../global';

@Injectable()
export class ConvocacaoService extends GenericService{

    constructor( http: Http, router: Router,
            private profissiogramaService: ProfissiogramaService,
            private exameService: ExameService,
            private empregadoService: EmpregadoService) { 
        super(http, router, "convocacao");
    }
    
    getTipos() {
        let urlRequisitos = GlobalVariable.BASE_API_URL + "/generic/tipo-convocacao";
        return this.http
            .get( urlRequisitos + "?filter=", { headers: this.headers } )
            .toPromise();
    }
    
    getEmpregadosByGerencia(convocacao: Convocacao) {
        let urlGetEmpregadosByGerencia = GlobalVariable.BASE_API_URL + "/convocacao/get-empregados-by-gerencia";
        return this.http
            .post( urlGetEmpregadosByGerencia, convocacao, { headers: this.headers } )
            .toPromise();
    }
    
    getEmpregadoConvocacao(convocacao: Convocacao) {
        let urlGetEmpregadoConvocacao = GlobalVariable.BASE_API_URL + "/convocacao/get-empregado";
        return this.http
            .post( urlGetEmpregadoConvocacao, convocacao, { headers: this.headers } )
            .toPromise();
    }
    
    getEmpregadoByChave( chave ) {
        return this.empregadoService.getEmpregadoByChave(chave);
    }
    
    getEmpregadoByName( nome ) {
        return this.empregadoService.getEmpregadoByName( nome );
    }
    
    getConvocacao(convocacao: Convocacao) {
        let urlConvocar = GlobalVariable.BASE_API_URL + "/convocacao/processar-convocacao";
        return this.http
            .post( urlConvocar, convocacao, { headers: this.headers } )
            .toPromise();
    }
    
    getProfissiogramas() {
        return this.profissiogramaService.getProfissiogramas();
    }
    
    getExames() {
        return this.exameService.getExames();
    }
    
}