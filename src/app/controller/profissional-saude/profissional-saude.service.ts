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

@Injectable()
export class ProfissionalSaudeService {

    private headers = new Headers( { 'Content-Type': 'application/json' } );
    private URL: string = GlobalVariable.BASE_API_URL + "/profissional";

    constructor( private http: Http, private router: Router ) { }

    submit( formulario: any ) {
        let urlSubmit = this.URL;
        return this.http
            .post( urlSubmit, formulario, { headers: this.headers } )
            .toPromise();
    }

    get( id: number ) {
        let urlGet = this.URL;
        return this.http
            .get( urlGet + "?id=" + id, { headers: this.headers } )
            .toPromise();
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
    
    list( profissionalSaudeFilter: ProfissionalSaudeFilter ) {
        let urlList = this.URL + "/list";
        return this.http
            .post( urlList, profissionalSaudeFilter, { headers: this.headers } )
            .toPromise();
    }
    
    delete( id ) {
        let urlDelete = this.URL + "/delete";
        return this.http
            .post( urlDelete, id, { headers: this.headers } )
            .toPromise();
    }

    private handleError( error: any ): Promise<any> {
        console.error( 'Um erro ocorreu: ', error._body );
        return Promise.reject( error.message || error );
    }

}