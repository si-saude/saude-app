import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { MyDatePickerModule } from 'mydatepicker';

import { GlobalVariable } from './../../../global';
import { Instalacao } from './../../../model/instalacao';
import { InstalacaoService } from './../instalacao.service';
import { InstalacaoFilter } from './../instalacao.filter';
import { InstalacaoBuilder } from './../instalacao.builder';
import { IndicadorRiscoAcidente } from './../../../model/indicador-risco-acidente';
import { IndicadorRiscoAmbiental } from './../../../model/indicador-risco-ambiental';
import { IndicadorRiscoErgonomico } from './../../../model/indicador-risco-ergonomico';
import { IndicadorRiscoSanitario } from './../../../model/indicador-risco-sanitario';
import { IndicadorRiscoSaudeAmbiental } from './../../../model/indicador-risco-saude-ambiental';
import { IndicadorRiscoAcidenteFilter } from './../../indicador-risco-acidente/indicador-risco-acidente.filter';
import { IndicadorRiscoAcidenteInstalacao } from './../../../model/indicador-risco-acidente-instalacao';
import { IndicadorRiscoAmbientalInstalacao } from './../../../model/indicador-risco-ambiental-instalacao';
import { IndicadorRiscoErgonomicoInstalacao } from './../../../model/indicador-risco-ergonomico-instalacao';
import { IndicadorRiscoSanitarioInstalacao } from './../../../model/indicador-risco-sanitario-instalacao';
import { IndicadorRiscoSaudeAmbientalInstalacao } from './../../../model/indicador-risco-saude-ambiental-instalacao';
import { GenericFormComponent } from './../../../generics/generic.form.component';

@Component( {
    selector: 'app-instalacao-form',
    templateUrl: './instalacao-form.html',
    styleUrls: ['./../../../../assets/css/form-component.css', './instalacao-form.css']
} )
export class InstalacaoFormComponent extends GenericFormComponent implements OnInit {
    instalacao: Instalacao;
    indicadoresRiscoAcidente: Array<IndicadorRiscoAcidente>;
    indicadoresRiscoAmbiental: Array<IndicadorRiscoAmbiental>;
    indicadoresRiscoErgonomico: Array<IndicadorRiscoErgonomico>;
    indicadoresRiscoSanitario: Array<IndicadorRiscoSanitario>;
    indicadoresRiscoSaudeAmbiental: Array<IndicadorRiscoSaudeAmbiental>;

    //ngModel
    dataInspecaoAcidente: Array<any> = new Array<any>();
    dataInspecaoAmbiental: Array<any> = new Array<any>();
    dataInspecaoErgonomico: Array<any> = new Array<any>();
    dataInspecaoSanitario: Array<any> = new Array<any>();
    dataInspecaoSaudeAmbiental: Array<any> = new Array<any>();

    instalacaoFilter: InstalacaoFilter = new InstalacaoFilter();

    constructor( private route: ActivatedRoute,
        private instalacaoService: InstalacaoService,
        router: Router) {
        super( instalacaoService, router );
        this.goTo = "instalacao";

        this.instalacao = new InstalacaoBuilder().initialize( this.instalacao );
    }

    ngOnInit() {

        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                if ( params['id'] !== undefined ) {
                    let id = params['id'];
                    this.showPreload = true;

                    this.instalacaoService.get( id )
                        .then( res => {
                            this.showPreload = false;
                            this.instalacao = new InstalacaoBuilder().clone( res.json() );
                            console.log( res.json() );
                            this.parseAndSetDates();
                        } )
                        .catch( error => {
                            this.catchConfiguration( error );
                        } )
                }
            } );

        this.getAcidentes();
        this.getAmbientais();
        this.getErgonomicos();
        this.getSanitarios();
        this.getSaudeAmbientais();
    }

    getAcidentes() {
        this.instalacaoService.getIndicadoresRiscoAcidente()
            .then( res => {
                this.indicadoresRiscoAcidente = res.json();
            } )
            .catch( error => {
                console.log( error );
            } )
    }

    getAmbientais() {
        this.instalacaoService.getIndicadoresRiscoAmbiental()
            .then( res => {
                this.indicadoresRiscoAmbiental = res.json();
            } )
            .catch( error => {
                console.log( error );
            } )
    }

    getErgonomicos() {
        this.instalacaoService.getIndicadoresRiscoErgonomico()
            .then( res => {
                this.indicadoresRiscoErgonomico = res.json();
            } )
            .catch( error => {
                console.log( error );
            } )
    }

    getSanitarios() {
        this.instalacaoService.getIndicadoresRiscoSanitario()
            .then( res => {
                this.indicadoresRiscoSanitario = res.json();
            } )
            .catch( error => {
                console.log( error );
            } )
    }

    getSaudeAmbientais() {
        this.instalacaoService.getIndicadoresRiscoSaudeAmbiental()
            .then( res => {
                this.indicadoresRiscoSaudeAmbiental = res.json();
            } )
            .catch( error => {
                console.log( error );
            } )
    }

    save() {
        this.verifyAndSetDates();
        super.save( new InstalacaoBuilder().clone( this.instalacao ) );
    }

    addIndicadoresRiscoAcidenteInstalacao() {
        if ( this.instalacao.getIndicadorRiscoAcidenteInstalacoes() === undefined ) {
            this.instalacao.setIndicadorRiscoAcidenteInstalacoes( new Array<IndicadorRiscoAcidenteInstalacao>() );
        }
        let iRAI = new IndicadorRiscoAcidenteInstalacao();
        iRAI.setIndicadorRisco( new IndicadorRiscoAcidente() );
        iRAI.setInstalacao( new Instalacao() );
        this.instalacao.getIndicadorRiscoAcidenteInstalacoes().push( iRAI );
    }

    removeIndicadoresRiscoAcidenteInstalacao( i: number ) {
        this.instalacao.getIndicadorRiscoAcidenteInstalacoes().splice( i, 1 );
    }

    addIndicadoresRiscoAmbientalInstalacao() {
        if ( this.instalacao.getIndicadorRiscoAmbientalInstalacoes() === undefined ) {
            this.instalacao.setIndicadorRiscoAmbientalInstalacoes( new Array<IndicadorRiscoAmbientalInstalacao>() );
        }
        let iRAI = new IndicadorRiscoAmbientalInstalacao();
        iRAI.setIndicadorRisco( new IndicadorRiscoAmbiental() );
        iRAI.setInstalacao( new Instalacao() );
        this.instalacao.getIndicadorRiscoAmbientalInstalacoes().push( iRAI );
    }

    removeIndicadoresRiscoAmbientalInstalacao( i: number ) {
        this.instalacao.getIndicadorRiscoAmbientalInstalacoes().splice( i, 1 );
    }

    addIndicadoresRiscoErgonomicoInstalacao() {
        if ( this.instalacao.getIndicadorRiscoErgonomicoInstalacoes() === undefined ) {
            this.instalacao.setIndicadorRiscoErgonomicoInstalacoes( new Array<IndicadorRiscoErgonomicoInstalacao>() );
        }
        let iREI = new IndicadorRiscoErgonomicoInstalacao();
        iREI.setIndicadorRisco( new IndicadorRiscoErgonomico() );
        iREI.setInstalacao( new Instalacao() );
        this.instalacao.getIndicadorRiscoErgonomicoInstalacoes().push( iREI );
    }

    removeIndicadoresRiscoErgonomicoInstalacao( i: number ) {
        this.instalacao.getIndicadorRiscoErgonomicoInstalacoes().splice( i, 1 );
    }

    addIndicadoresRiscoSanitarioInstalacao() {
        if ( this.instalacao.getIndicadorRiscoSanitarioInstalacoes() === undefined ) {
            this.instalacao.setIndicadorRiscoSanitarioInstalacoes( new Array<IndicadorRiscoSanitarioInstalacao>() );
        }
        let iRSI = new IndicadorRiscoSanitarioInstalacao();
        iRSI.setIndicadorRisco( new IndicadorRiscoSanitario() );
        iRSI.setInstalacao( new Instalacao() );
        this.instalacao.getIndicadorRiscoSanitarioInstalacoes().push( iRSI );
    }

    removeIndicadoresRiscoSanitarioInstalacao( i: number ) {
        this.instalacao.getIndicadorRiscoSanitarioInstalacoes().splice( i, 1 );
    }

    addIndicadoresRiscoSaudeAmbientalInstalacao() {
        if ( this.instalacao.getIndicadorRiscoSaudeAmbientalInstalacoes() === undefined ) {
            this.instalacao.setIndicadorRiscoSaudeAmbientalInstalacoes( new Array<IndicadorRiscoSaudeAmbientalInstalacao>() );
        }
        let iRSAI = new IndicadorRiscoSaudeAmbientalInstalacao();
        iRSAI.setIndicadorRisco( new IndicadorRiscoSaudeAmbiental() );
        iRSAI.setInstalacao( new Instalacao() );
        this.instalacao.getIndicadorRiscoSaudeAmbientalInstalacoes().push( iRSAI );
    }

    removeIndicadoresRiscoSaudeAmbientalInstalacao( i: number ) {
        this.instalacao.getIndicadorRiscoSaudeAmbientalInstalacoes().splice( i, 1 );
    }

    onDestroy() {
        this.inscricao.unsubscribe();
    }

    verifyAndSetDates() {

        if ( this.instalacao.getIndicadorRiscoAcidenteInstalacoes() !== undefined &&
            this.instalacao.getIndicadorRiscoAcidenteInstalacoes() !== null ) {

            for ( let i = 0; i < this.instalacao.getIndicadorRiscoAcidenteInstalacoes().length; i++ ) {
                if ( this.dataInspecaoAcidente[i] !== undefined &&
                    this.dataInspecaoAcidente[i] !== null )
                    this.instalacao.getIndicadorRiscoAcidenteInstalacoes()[i].setDataInspecao(
                        this.parseDatePickerToDate( this.dataInspecaoAcidente[i] ) );
            }
        }

        if ( this.instalacao.getIndicadorRiscoAmbientalInstalacoes() !== undefined &&
            this.instalacao.getIndicadorRiscoAmbientalInstalacoes() !== null ) {

            for ( let i = 0; i < this.instalacao.getIndicadorRiscoAmbientalInstalacoes().length; i++ ) {
                if ( this.dataInspecaoAmbiental[i] !== undefined &&
                    this.dataInspecaoAmbiental[i] !== null )
                    this.instalacao.getIndicadorRiscoAmbientalInstalacoes()[i].setDataInspecao(
                        this.parseDatePickerToDate( this.dataInspecaoAmbiental[i] ) );
            }
        }

        if ( this.instalacao.getIndicadorRiscoErgonomicoInstalacoes() !== undefined &&
            this.instalacao.getIndicadorRiscoErgonomicoInstalacoes() !== null ) {

            for ( let i = 0; i < this.instalacao.getIndicadorRiscoErgonomicoInstalacoes().length; i++ ) {
                if ( this.dataInspecaoErgonomico[i] !== undefined &&
                    this.dataInspecaoErgonomico[i] !== null )
                    this.instalacao.getIndicadorRiscoErgonomicoInstalacoes()[i].setDataInspecao(
                        this.parseDatePickerToDate( this.dataInspecaoErgonomico[i] ) );
            }
        }

        if ( this.instalacao.getIndicadorRiscoSanitarioInstalacoes() !== undefined &&
            this.instalacao.getIndicadorRiscoSanitarioInstalacoes() !== null ) {

            for ( let i = 0; i < this.instalacao.getIndicadorRiscoSanitarioInstalacoes().length; i++ ) {
                if ( this.dataInspecaoSanitario[i] !== undefined &&
                    this.dataInspecaoSanitario[i] !== null )
                    this.instalacao.getIndicadorRiscoSanitarioInstalacoes()[i].setDataInspecao(
                        this.parseDatePickerToDate( this.dataInspecaoSanitario[i] ) );
            }
        }

        if ( this.instalacao.getIndicadorRiscoSaudeAmbientalInstalacoes() !== undefined &&
            this.instalacao.getIndicadorRiscoSaudeAmbientalInstalacoes() !== null ) {

            for ( let i = 0; i < this.instalacao.getIndicadorRiscoSaudeAmbientalInstalacoes().length; i++ ) {
                if ( this.dataInspecaoSaudeAmbiental[i] !== undefined &&
                    this.dataInspecaoSaudeAmbiental[i] !== null )
                    this.instalacao.getIndicadorRiscoSaudeAmbientalInstalacoes()[i].setDataInspecao(
                        this.parseDatePickerToDate( this.dataInspecaoSaudeAmbiental[i] ) );
            }
        }

    }

    parseAndSetDates() {
        if ( this.instalacao.getIndicadorRiscoAcidenteInstalacoes() !== undefined &&
            this.instalacao.getIndicadorRiscoAcidenteInstalacoes() !== null ) {

            for ( let i = 0; i < this.instalacao.getIndicadorRiscoAcidenteInstalacoes().length; i++ ) {
                this.dataInspecaoAcidente[i] =
                    this.parseDataToObjectDatePicker(
                        this.instalacao.getIndicadorRiscoAcidenteInstalacoes()[i].getDataInspecao() );
            }
        }

        if ( this.instalacao.getIndicadorRiscoAmbientalInstalacoes() !== undefined &&
            this.instalacao.getIndicadorRiscoAmbientalInstalacoes() !== null ) {

            for ( let i = 0; i < this.instalacao.getIndicadorRiscoAmbientalInstalacoes().length; i++ ) {
                this.dataInspecaoAmbiental[i] =
                    this.parseDataToObjectDatePicker(
                        this.instalacao.getIndicadorRiscoAmbientalInstalacoes()[i].getDataInspecao() );
            }
        }

        if ( this.instalacao.getIndicadorRiscoErgonomicoInstalacoes() !== undefined &&
            this.instalacao.getIndicadorRiscoErgonomicoInstalacoes() !== null ) {

            for ( let i = 0; i < this.instalacao.getIndicadorRiscoErgonomicoInstalacoes().length; i++ ) {
                this.dataInspecaoErgonomico[i] =
                    this.parseDataToObjectDatePicker(
                        this.instalacao.getIndicadorRiscoErgonomicoInstalacoes()[i].getDataInspecao() );
            }
        }

        if ( this.instalacao.getIndicadorRiscoSanitarioInstalacoes() !== undefined &&
            this.instalacao.getIndicadorRiscoSanitarioInstalacoes() !== null ) {

            for ( let i = 0; i < this.instalacao.getIndicadorRiscoSanitarioInstalacoes().length; i++ ) {
                this.dataInspecaoSanitario[i] =
                    this.parseDataToObjectDatePicker(
                        this.instalacao.getIndicadorRiscoSanitarioInstalacoes()[i].getDataInspecao() );
            }
        }

        if ( this.instalacao.getIndicadorRiscoSaudeAmbientalInstalacoes() !== undefined &&
            this.instalacao.getIndicadorRiscoSaudeAmbientalInstalacoes() !== null ) {

            for ( let i = 0; i < this.instalacao.getIndicadorRiscoSaudeAmbientalInstalacoes().length; i++ ) {
                this.dataInspecaoSaudeAmbiental[i] =
                    this.parseDataToObjectDatePicker(
                        this.instalacao.getIndicadorRiscoSaudeAmbientalInstalacoes()[i].getDataInspecao() );
            }
        }

    }
}
