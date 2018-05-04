import { Router } from '@angular/router';
import { Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';

import { GlobalVariable } from './../../global';
import { UsuarioService } from './../usuario/usuario.service';
import { LocalizacaoService } from './../localizacao/localizacao.service';
import { LocalizacaoFilter } from './../localizacao/localizacao.filter';
import { ProfissionalSaudeService } from './../profissional-saude/profissional-saude.service';
import { GenericService } from './../../generics/generic.service';

@Injectable()
export class AtendimentoService extends GenericService {
    
    constructor( http: Http, router: Router,
            private usuarioService: UsuarioService,
            private profissionalService: ProfissionalSaudeService,
            private localizacaoService: LocalizacaoService ) {
        super(http,router,"atendimento");
    }
    
    getUsuario( id: number ) {
        return this.usuarioService.get( id );
    }
    
    getProfissional( profissionalFilter ) {
        return this.profissionalService.list( profissionalFilter );
    }
    
    getLocalizacoes( ) {
        return this.localizacaoService.selectList( new LocalizacaoFilter() );
    }
    
    atualizar( filaAtendimentoOcupacional ) {
        let urlAtualizar = this.URL + "/atualizar";
        return this.http
            .post( urlAtualizar, filaAtendimentoOcupacional, { headers: this.headers } )
            .toPromise();
    }
    
    atualizarLista( filaAtendimentoOcupacional ) {
        let urlAtualizarLista = this.URL + "/atualizar-lista";
        return this.http
            .post( urlAtualizarLista, filaAtendimentoOcupacional, { headers: this.headers } )
            .toPromise();
    }
    
    entrar( filaAtendimentoOcupacional ) {
        let urlEntrar = this.URL + "/entrar";
        return this.http
            .post( urlEntrar, filaAtendimentoOcupacional, { headers: this.headers } )
            .toPromise();
    }
    
    pausar( filaAtendimentoOcupacional ) {
        let urlPausar = this.URL + "/pausar";
        return this.http
            .post( urlPausar, filaAtendimentoOcupacional, { headers: this.headers } )
            .toPromise();
    }
    
    almoco( filaAtendimentoOcupacional ) {
        let urlAlmoco = this.URL + "/registrar-almoco";
        return this.http
            .post( urlAlmoco, filaAtendimentoOcupacional, { headers: this.headers } )
            .toPromise();
    }
    
    encerrar( filaAtendimentoOcupacional ) {
        let urlEncerrar = this.URL + "/encerrar";
        return this.http
            .post( urlEncerrar, filaAtendimentoOcupacional, { headers: this.headers } )
            .toPromise();
    }
    
    voltar( filaAtendimentoOcupacional ) {
        let urlVoltar = this.URL + "/voltar";
        return this.http
            .post( urlVoltar, filaAtendimentoOcupacional, { headers: this.headers } )
            .toPromise();
    }
    
    iniciar( atendimento ) {
        let urlIniciar = this.URL + "/iniciar";
        return this.http
            .post( urlIniciar, atendimento, { headers: this.headers } )
            .toPromise();
    }
    
    registrarAusencia( atendimento ) {
        let urlAusencia = this.URL + "/registrar-ausencia";
        return this.http
            .post( urlAusencia, atendimento, { headers: this.headers } )
            .toPromise();
    }
    
    liberar( atendimento ) {
        let urlLiberar = this.URL + "/liberar";
        return this.http
            .post( urlLiberar, atendimento, { headers: this.headers } )
            .toPromise();
    }
    
    finalizar( atendimento ) {
        let urlFinalizar = this.URL + "/finalizar";
        return this.http
            .post( urlFinalizar, atendimento, { headers: this.headers } )
            .toPromise();
    }
    
    devolverPraFila( atendimento ) {
        let urlFinalizar = this.URL + "/devolver-pra-fila";
        return this.http
            .post( urlFinalizar, atendimento, { headers: this.headers } )
            .toPromise();
    }
    
    finalizarPausar( atendimento ) {
        let urlFinalizar = this.URL + "/finalizar-pausar";
        return this.http
            .post( urlFinalizar, atendimento, { headers: this.headers } )
            .toPromise();
    }
    
}