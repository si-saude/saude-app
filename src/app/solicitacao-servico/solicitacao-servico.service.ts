import { Router } from '@angular/router';
import { Headers, Http } from '@angular/http';
import { Injectable, EventEmitter } from '@angular/core';

import { GlobalVariable } from './../global';
import { Tarefa } from './../model/tarefa';
import { UsuarioService } from './../controller/usuario/usuario.service';

@Injectable()
export class SolicitacaoServicoService {
    protected headers: Headers;
    protected URL: string;
    
    constructor( protected http: Http, protected router: Router,
            private usuarioService: UsuarioService ) { 
        this.headers = new Headers( { 'Content-Type': 'application/json' } );
        this.headers.append('Authorization', 'Bearer '+localStorage.getItem('token'));
        this.URL = GlobalVariable.BASE_API_URL;
    }
    
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
    
    list( genericFilter) {
        let urlList = this.URL + "/list";
        return this.http
            .post( urlList, genericFilter, { headers: this.headers } )
            .toPromise();
    }
    
    delete( id ) {
        let urlDelete = this.URL + "/delete";
        return this.http
            .post( urlDelete, id, { headers: this.headers } )
            .toPromise();
    }
    
    selectList( genericFilter ) {
        genericFilter.setPageSize(Math.pow(2, 31)-1);
        let urlList = this.URL + "/selectList";
        return this.http
            .post( urlList, genericFilter, { headers: this.headers } )
            .toPromise();
    }
    
    sendFile( file ) {
        let urlSendFile = this.URL + "/import";
        this.headers = new Headers( { 'Content-Type': 'multipart/form-data' } );
        return this.http
            .post( urlSendFile, file, { headers: this.headers } )
            .toPromise();
    }
    
    sendFileWithPath( file, path ) {
        let urlSendFile = this.URL + "/" + path;
        this.headers = new Headers( { 'Content-Type': 'multipart/form-data' } );
        return this.http
            .post( urlSendFile, file, { headers: this.headers } )
            .toPromise();
    }
    
    sendFileAsObject( file ) {
        let urlSendFile = this.URL + "/import";
        return this.http
            .post( urlSendFile, file, { headers: this.headers } )
            .toPromise();
    }
    
    getEmpregado( empregadoFilter ) {
        let urlEmpregado = this.URL + "/empregado/list";
        return this.http
            .post( urlEmpregado, empregadoFilter, { headers: this.headers } )
            .toPromise();
    }
    
    getServicos( servicoFilter ) {
        let urlServico = this.URL + "/servico/selectList";
        return this.http
            .post( urlServico, servicoFilter, { headers: this.headers } )
            .toPromise();
    }
    
    getUsuario( id: number ) {
//        let urlGet = this.URL + "/usuario";
//        return this.http
//            .get( urlGet + "?id=" + id, { headers: this.headers } )
//            .toPromise();
        return this.usuarioService.get(id);
    }
    
    getGerencia( gerenciaFilter ) {
        let urlGerencia = this.URL + "/gerencia/list";
        return this.http
            .post( urlGerencia, gerenciaFilter, { headers: this.headers } )
            .toPromise();
    }
    
    registrarAtendimento( atendimento ) {
        let urlSolicitacao = this.URL + "/atendimento/registrar-solicitacao-atendimento";
        return this.http
            .post( urlSolicitacao, atendimento, { headers: this.headers } )
            .toPromise();
    }
}