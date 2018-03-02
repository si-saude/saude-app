import { Component, OnInit, EventEmitter, Output, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MaterializeAction } from "angular2-materialize";
import { MyDatePickerModule } from 'mydatepicker';
import { Subscription } from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { TimerObservable } from "rxjs/observable/TimerObservable";
import 'rxjs/Rx';

import { GlobalVariable } from './../../../global';
import { Atendimento } from './../../../model/atendimento';
import { AtendimentoBuilder } from './../../atendimento/atendimento.builder';
import { FilaAtendimentoOcupacional } from './../../../model/fila-atendimento-ocupacional';
import { FilaAtendimentoOcupacionalBuilder } from './../../fila-atendimento-ocupacional/fila-atendimento-ocupacional.builder';
import { Localizacao } from './../../../model/localizacao';
import { LocalizacaoBuilder } from './../../localizacao/localizacao.builder';
import { FilaEsperaOcupacional } from './../../../model/fila-espera-ocupacional';
import { FilaEsperaOcupacionalService } from './../fila-espera-ocupacional.service';
import { FilaEsperaOcupacionalBuilder } from './../fila-espera-ocupacional.builder';

@Component( {
    selector: 'app-fila',
    templateUrl: './fila.html',
    styleUrls: ['./fila.css']
} )
export class FilaComponent {
    atendimento: Atendimento;
    atendimentos: Array<Atendimento>;
    atendimentosProfissionais: Array<Atendimento>;
    filaAtendimentoOcupacional: FilaAtendimentoOcupacional;
    localizacao: Localizacao;
    localizacoes: Array<Localizacao>;
    filaEsperaOcupacional: FilaEsperaOcupacional;
    wasRequested: boolean;
    globalActions;
    toastParams;
    inscricao: Subscription;
    alive: boolean;
    audio: any;
    showNothing: boolean;

    constructor( private route: ActivatedRoute,
        private filaEsperaOcupacionalService: FilaEsperaOcupacionalService) {
        this.globalActions = new EventEmitter<string | MaterializeAction>();
        this.toastParams = ['', 4000];
        this.atendimentos = new AtendimentoBuilder().initializeList( this.atendimentos );
        this.atendimentosProfissionais = new AtendimentoBuilder().initializeList( this.atendimentos );
        this.localizacao = new LocalizacaoBuilder().initialize( this.localizacao );
        this.localizacoes = new LocalizacaoBuilder().initializeList( this.localizacoes );
        this.filaEsperaOcupacional = new FilaEsperaOcupacionalBuilder().initialize( this.filaEsperaOcupacional );
        this.alive = true;
        this.audio = new Audio();
        this.showNothing = true;
    }

    ngOnInit() {
        this.getLocalizacoes();
        this.audio.src = "./../../../../assets/audio/beep.mp3";
    }
    
    ngAfterViewInit() {
        document.getElementsByClassName("conteudo")[0]["style"].width = "100%";   
    }

    startFila( localizacaoId ) {
        if ( localizacaoId == 0 ) {
            this.toastParams = ['Por favor, preencha todos os campos', 4000];
            this.globalActions.emit( 'toast' );
            this.wasRequested = false;
            return;
        } else {
            this.localizacao.setId( localizacaoId );
            this.filaEsperaOcupacional.setLocalizacao( this.localizacao );
            this.filaAtendimentoOcupacional = new FilaAtendimentoOcupacionalBuilder().initialize(new FilaAtendimentoOcupacional());
            this.filaAtendimentoOcupacional.setLocalizacao(this.localizacao);

            this.atendimento = new AtendimentoBuilder().initialize(new Atendimento());

            this.atendimento.setFilaEsperaOcupacional( this.filaEsperaOcupacional );
            this.inscricao = TimerObservable.create(0, 15000)
                .takeWhile(() => this.alive )
                .subscribe(() => {
                    this.refresh();
                    this.atualizarLista();
                } );
        }

    }
    
    refresh() {
        if ( this.atendimento != undefined ) {
            this.filaEsperaOcupacionalService.refresh( this.atendimento )
                .then( res => {
                    this.atendimentos = new AtendimentoBuilder().cloneList( res.json() );
                    if ( this.atendimentos.length > 0 ) {
                        this.audio.load();
                        this.audio.play();
                    }
                    this.wasRequested = true;
                } )
                .catch( error => {
                    console.log(error.text());
                } )            
        }
    }
    
    atualizarLista() {
        if ( this.filaAtendimentoOcupacional != undefined ) {
            this.filaEsperaOcupacionalService.atualizarLista( this.filaAtendimentoOcupacional )
                .then( res => {
                    this.atendimentosProfissionais = new AtendimentoBuilder().cloneList( res.json() );
                } )
                .catch( error => {
                    console.log( "Erro ao atualizar lista: " + error.text() );
                } )
        } else {
            console.log( "Fila de atendimento nao preenchida." )
        }
    }

    getLocalizacoes() {
        this.filaEsperaOcupacionalService.getLocalizacoes()
            .then( res => {
                this.localizacoes = new LocalizacaoBuilder().cloneList( res.json() );
            } )
            .catch( error => {
                console.log( error.text() );
            } )
    }

    ngOnDestroy() {
        this.inscricao.unsubscribe();
    }
    
}