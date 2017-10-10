import { Router } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { GlobalVariable } from './../../global';
import { ProfissionalSaude } from './../../model/profissional-saude';
import { ProfissionalSaudeFilter } from './profissional-saude.filter';
import { LocalizacaoFilter } from './../localizacao/localizacao.filter';
import { FuncaoFilter } from './../funcao/funcao.filter';
import { EquipeFilter } from './../equipe/equipe.filter';
import { CursoFilter } from './../curso/curso.filter';
import { CidadeFilter } from './../cidade/cidade.filter';
import { GenericService } from './../../generics/generic.service';

@Injectable()
export class ProfissionalSaudeService extends GenericService{

    constructor( http: Http, router: Router ) { 
        super(http, router, "profissional");
    }


    getLocalizacoes(localizacaoFilter: LocalizacaoFilter) {
        let urlGetLocalizacao = GlobalVariable.BASE_API_URL + "/localizacao/selectList";
        return this.http
            .post( urlGetLocalizacao, localizacaoFilter, { headers: this.headers })
            .toPromise();
    }
    
    getFuncoes(funcaoFilter: FuncaoFilter) {
        let urlGetFuncao = GlobalVariable.BASE_API_URL + "/funcao/selectList";
        return this.http
            .post( urlGetFuncao, funcaoFilter, { headers: this.headers })
            .toPromise();
    }
    
    getEquipe(equipeFilter: EquipeFilter) {
        let urlGetEquipe = GlobalVariable.BASE_API_URL + "/equipe/selectList";
        return this.http
            .post( urlGetEquipe, equipeFilter, { headers: this.headers })
            .toPromise();
    }
    
    getCursos(cursoFilter: CursoFilter) {
        let urlGetCurso = GlobalVariable.BASE_API_URL + "/curso/selectList";
        return this.http
            .post( urlGetCurso, cursoFilter, { headers: this.headers })
            .toPromise();
    }
    
    getCidades(cidadeFilter: CidadeFilter) {
        let urlGetCidade = GlobalVariable.BASE_API_URL + "/cidade/selectList";
        return this.http
            .post( urlGetCidade, cidadeFilter, { headers: this.headers })
            .toPromise();
    }
}