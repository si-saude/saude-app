import { EventEmitter, SimpleChanges, Component, Input, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { MaterializeAction } from "angular2-materialize";
import * as $ from 'jquery';

import { ModalExameComponent } from './../modal-exame/modal-exame.component';
import { ModalConfirmComponent } from './..//modal-confirm/modal-confirm.component';
import { Aptidao } from './../../model/aptidao';
import { ExameBuilder } from './../../../app/controller/exame/exame.builder';
import { Exame } from './../../model/exame';
import { Atendimento } from './../../model/atendimento';
import { GrupoMonitoramento } from './../../model/grupo-monitoramento';
import { GlobalVariable } from './../../global';

@Component( {
    selector: 'app-informacao-aso',
    templateUrl: './informacao-aso.html',
    styleUrls: ['./informacao-aso.css']
} )
export class InformacaoAsoComponent{
    
    @Input() atendimento: Atendimento;
    @Input() service;
    @ViewChild( ModalExameComponent ) modalExame: ModalExameComponent;
    @ViewChild( ModalConfirmComponent ) modalConfirm: ModalConfirmComponent;
    protected globalActions;
    protected toastParams;
    
    private aptidoesAso: Array<string>;
    
    constructor( router: Router ) {
    }
    
    ngOnInit() {
        this.globalActions = new EventEmitter<string | MaterializeAction>();
        this.toastParams = ['', 4000];  
        this.getAptidaoAso();
    }
    
    ngOnChanges( changes: SimpleChanges ) {
    }
    
    getAptidaoAso() {
        this.service.getAptidaoAso()
            .then( res => {
                this.aptidoesAso = Object.keys( res.json() ).sort();
            } )
            .catch( error => {
                console.log( error );
            } )
    }
    
    eInapto(){       
        
        if(this.atendimento.getAso() != undefined && this.atendimento.getAso().getAptidoes().find(x=> x.getAptidaoAso() =='INAPTO') != undefined) 
            return true;
        
        this.atendimento.getAso().getDataRestricaoCustomDate().setAppDate(undefined);        
        return false;
    }
    
    addExame(exame: Exame) {
        if ( this.atendimento.getAso().getExamesConvocacao().find(ec => ec.getId() == exame.getId() ) != undefined ) {
            this.toastParams = ["N&atilde;o &eacute; poss&iacute;vel adicionar exames repetidos.", 4000];
            this.globalActions.emit( 'toast' );
            return;
        }
        this.atendimento.getAso().getExamesConvocacao().push(new ExameBuilder().clone(exame)); 
    }
    
    setAusenciaExames(evento) {
        if ( evento.target.checked ) {
            this.modalConfirm.setMensagem("Tem certeza que deseja excluir todos os exames?");
            this.modalConfirm.openModal();
        }
    }
    setPendente(evento){        
        if ( evento.target.checked ) {
            this.atendimento.getAso().setExamesConvocacao(new Array<Exame>());
        }           
    }
    functionModalConfirm(evento) {
        if ( evento ) 
            this.atendimento.getAso().setExamesConvocacao(new Array<Exame>());
        else 
            this.atendimento.getAso().setAusenciaExames(false);
    }
    verifyEnableConvocacao(){
        
        if(this.atendimento.getAso() == undefined || this.atendimento.getAso().getAusenciaExames() || this.atendimento.getAso().getAptidoes().find(x=> x.getAptidaoAso() =='INAPTO') == undefined || this.atendimento.getAso().getPendente())
            return true;
     
        return false;
    }
    
  verifyEnableCheckAusencia(){
        
        if(this.atendimento.getAso() == undefined || this.atendimento.getAso().getAptidoes().find(x=> x.getAptidaoAso() =='INAPTO') == undefined || this.atendimento.getAso().getPendente()){
            this.atendimento.getAso().setAusenciaExames(false);
            return true;
        }
     
        return false;
    }

} 