import { Router } from '@angular/router';
import { Headers, Http } from '@angular/http';
import { Injectable, EventEmitter } from '@angular/core';

import { GlobalVariable } from './../global';
import { Tarefa } from './../model/tarefa';
import { UsuarioService } from './../controller/usuario/usuario.service';
import { ServicoService } from './../controller/servico/servico.service';
import { GerenciaService } from './../controller/gerencia/gerencia.service';
import { EmpregadoService } from './../controller/empregado/empregado.service';
import { TipoSolicitacaoService } from './../controller/tipo-solicitacao/tipo-solicitacao.service';

@Injectable()
export class SolicitacaoServicoService {
    protected headers: Headers;
    protected URL: string;
    
    constructor( protected http: Http, protected router: Router,
            private usuarioService: UsuarioService,
            private servicoService: ServicoService,
            private gerenciaService: GerenciaService,
            private empregadoService: EmpregadoService,
            private tipoSolicitacaoService: TipoSolicitacaoService) {
        this.headers = new Headers( { 'Content-Type': 'application/json' } );
        this.headers.append('Authorization', 'Bearer '+localStorage.getItem('token'));
        this.URL = GlobalVariable.BASE_API_URL;
    }
    
    getEmpregado( empregadoFilter ) {
        let urlEmpregado = this.URL + "/empregado/list-eq";
        return this.http
            .post( urlEmpregado, empregadoFilter, { headers: this.headers } )
            .toPromise();
    }
    
    getEmpregadoByChave( empregadoFilter ) {
        return this.empregadoService.selectList( empregadoFilter );
    }
    
    getServicos( servicoFilter ) {
        return this.servicoService.selectList( servicoFilter );
    }
    
    getUsuario( id: number ) {
        return this.usuarioService.get(id);
    }
    
    getGerencia( gerenciaFilter ) {
        return this.gerenciaService.list( gerenciaFilter );
    }
    
    registrarAtendimento( atendimento ) {
        let urlSolicitacao = this.URL + "/atendimento/registrar-solicitacao-atendimento";
        return this.http
            .post( urlSolicitacao, atendimento, { headers: this.headers } )
            .toPromise();
    }
    
    registrarSolicitacao( solicitacao ) {
        let urlSolicitacao = this.URL + "/solicitacao-central-integra/registrar-solicitacao";
        return this.http
            .post( urlSolicitacao, solicitacao, { headers: this.headers } )
            .toPromise();
    }
    
    getTipoSolicitacoes() {
        return this.tipoSolicitacaoService.getTipoSolicitacoes();
    }
    
    getEmpregadoService() {
        return this.empregadoService;
    }
    
    
}