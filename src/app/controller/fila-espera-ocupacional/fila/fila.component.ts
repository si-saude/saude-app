import { Component, OnInit, EventEmitter, HostListener } from '@angular/core';
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
        this.atendimento = new AtendimentoBuilder().initialize( this.atendimento );
        this.atendimentos = new AtendimentoBuilder().initializeList( this.atendimentos );
        this.regraAtendimento = new RegraAtendimentoBuilder().initialize( this.regraAtendimento );
        this.regraAtendimentos = new RegraAtendimentoBuilder().initializeList( this.regraAtendimentos );
        this.localizacao = new LocalizacaoBuilder().initialize( this.localizacao );
        this.localizacoes = new LocalizacaoBuilder().initializeList( this.localizacoes );
        this.filaEsperaOcupacional = new FilaEsperaOcupacionalBuilder().initialize( this.filaEsperaOcupacional );
        this.alive = true;
    }

    ngOnInit() {
        if ( localStorage.getItem( "atendimento" ) == undefined ) {
            this.wasRequested = false;
            this.getLocalizacoes();
            this.getRegraAtendimentos();
        } else {
            
            this.wasRequested = true;

            this.atendimento = new AtendimentoBuilder().clone( JSON.parse( localStorage.getItem( "atendimento" ) ) );
            
            this.inscricao = TimerObservable.create(0, 5000)
                .takeWhile(() => this.alive)
                .subscribe(() => {
                    this.filaEsperaOcupacionalService.refresh( this.atendimento )
                        .then( res => {
                            console.log( res.json() );
                            this.atendimentos = new AtendimentoBuilder().cloneList( res.json() );
                        } )
                        .catch( error => {
                            console.log("Erro no refresh: " + error.text());
//                            this.wasRequested = false;
                        } )
                } );

        }
    }

    startFila( localizacaoId, regraAtendimentoId ) {
        if ( ( localizacaoId && regraAtendimentoId ) == 0 ) {
            this.toastParams = ['Por favor, preencha todos os campos', 4000];
            this.globalActions.emit( 'toast' );
            this.wasRequested = false;
            return;
        }

        this.regraAtendimento.setId( regraAtendimentoId );
        this.localizacao.setId( localizacaoId );
        this.filaEsperaOcupacional.setLocalizacao( this.localizacao );

        this.atendimento.setRegra( this.regraAtendimento );
        this.atendimento.setFilaEsperaOcupacional( this.filaEsperaOcupacional );

        this.inscricao = TimerObservable.create(0, 5000)
            .takeWhile(() => this.alive )
            .subscribe(() => {
                console.log("refresh");
                this.filaEsperaOcupacionalService.refresh( this.atendimento )
                    .then( res => {
                        localStorage.setItem( "atendimento", JSON.stringify( this.atendimento ) );
                        this.wasRequested = true;
                    } )
                    .catch( error => {
                        console.log(error.text());
                    } )
            } );
    }

    choiseAnotherFila() {
        localStorage.removeItem( "atendimento" );
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
        
    @HostListener('window:beforeunload', ['$event'])
    beforeunloadHandler(event) {
        console.log("unload");
//        localStorage.removeItem("atendimento");
    }
    
}