import { Component, OnInit, EventEmitter } from '@angular/core';
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
import { RegraAtendimento } from './../../../model/regra-atendimento';
import { RegraAtendimentoBuilder } from './../../regra-atendimento/regra-atendimento.builder';
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
    regraAtendimento: RegraAtendimento;
    regraAtendimentos: Array<RegraAtendimento>;
    localizacao: Localizacao;
    localizacoes: Array<Localizacao>;
    filaEsperaOcupacional: FilaEsperaOcupacional;
    wasRequested: boolean;
    globalActions;
    toastParams;
    inscricao: Subscription;
    alive: boolean;

    constructor( private route: ActivatedRoute,
        private filaEsperaOcupacionalService: FilaEsperaOcupacionalService ) {
        this.globalActions = new EventEmitter<string | MaterializeAction>();
        this.toastParams = ['', 4000];
        this.atendimentos = new AtendimentoBuilder().initializeList( this.atendimentos );
        this.regraAtendimento = new RegraAtendimentoBuilder().initialize( this.regraAtendimento );
        this.regraAtendimentos = new RegraAtendimentoBuilder().initializeList( this.regraAtendimentos );
        this.localizacao = new LocalizacaoBuilder().initialize( this.localizacao );
        this.localizacoes = new LocalizacaoBuilder().initializeList( this.localizacoes );
        this.filaEsperaOcupacional = new FilaEsperaOcupacionalBuilder().initialize( this.filaEsperaOcupacional );
        this.alive = true;
    }

    ngOnInit() {
        this.getLocalizacoes();
        this.getRegraAtendimentos();
    }

    startFila( localizacaoId, regraAtendimentoId ) {
        if ( ( localizacaoId && regraAtendimentoId ) == 0 ) {
            this.toastParams = ['Por favor, preencha todos os campos', 4000];
            this.globalActions.emit( 'toast' );
            this.wasRequested = false;
            return;
        } else {
            this.regraAtendimento.setId( regraAtendimentoId );
            this.localizacao.setId( localizacaoId );
            this.filaEsperaOcupacional.setLocalizacao( this.localizacao );
            
            this.atendimento = new AtendimentoBuilder().initialize(new Atendimento());
    
            this.atendimento.setRegra( this.regraAtendimento );
            this.atendimento.setFilaEsperaOcupacional( this.filaEsperaOcupacional );
            this.inscricao = TimerObservable.create(0, 5000)
                .takeWhile(() => this.alive )
                .subscribe(() => {
                    this.filaEsperaOcupacionalService.refresh( this.atendimento )
                        .then( res => {
                            this.atendimentos = new AtendimentoBuilder().cloneList( res.json() );
                            console.log("refresh");
                            this.wasRequested = true;
                        } )
                        .catch( error => {
                            console.log(error.text());
                        } )
                } );
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

    getRegraAtendimentos() {
        this.filaEsperaOcupacionalService.getRegraAtendimentos()
            .then( res => {
                this.regraAtendimentos = new RegraAtendimentoBuilder().cloneList( res.json() );
            } )
            .catch( error => {
                console.log( error.text() );
            } )
    }

    ngOnDestroy() {
        this.inscricao.unsubscribe();
    }
    
}