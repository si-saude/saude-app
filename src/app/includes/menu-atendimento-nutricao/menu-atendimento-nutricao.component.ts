import { EventEmitter, SimpleChanges, Component, Input, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MaterializeAction } from "angular2-materialize";
import * as $ from 'jquery';

import { Atendimento } from './../../model/atendimento';

@Component( {
    selector: 'app-menu-atendimento-nutricao',
    templateUrl: './menu-atendimento-nutricao.html',
    styleUrls: ['./menu-atendimento-nutricao.css']
} )
export class MenuAtendimentoNutricaoComponent{
    @Input() atendimento: Atendimento;
    @Output() btnNovoQuestionario = new EventEmitter<boolean>();
    @Output() btnNovoRecordatorio = new EventEmitter<boolean>();
    @Output() btnCarregar = new EventEmitter<boolean>();
    private disableNovoQuestionario = false;
    private disableNovoRecordatorio = false;
    
    constructor() {}
    
    newQuestionario() {
        this.btnNovoQuestionario.emit(true);
    }
    
    newRecordatorio() {
        this.btnNovoRecordatorio.emit(true);
    }
    
    //RECEBE O INDICATIVO DE QUE DEVE SER REDIRECIONADO OU NAO PARA A PAGINA DE NOVO QUESTIONARIO
    //CASO TRUE, NAO REDIRECIONA, CASO CONTRARIO, REDIRECIONA
    callBtnNewQuestionario( bool ) {
        if ( bool )
            this.disableNovoQuestionario = true;
        else  
            window.open('/questionario-conhecimento-alimentar/cadastrar/'+this.atendimento.getId()+"/"+
                    this.atendimento.getFilaEsperaOcupacional().getEmpregado().getPessoa().getNome());
    }
    
  //RECEBE O INDICATIVO DE QUE DEVE SER REDIRECIONADO OU NAO PARA A PAGINA DE NOVO QUESTIONARIO
    //CASO TRUE, NAO REDIRECIONA, CASO CONTRARIO, REDIRECIONA
    callBtnNewRecordatorio( bool ) {
        if ( bool )
            this.disableNovoRecordatorio = true;
        else  
            window.open('/recordatorio/cadastrar/'+this.atendimento.getId()+"/"+
                    this.atendimento.getFilaEsperaOcupacional().getEmpregado().getPessoa().getNome());
    }
    
    setDisabledNovoQuestionario( bool ) {
        this.disableNovoQuestionario = bool;
    }
    
    setDisabledNovoRecordatorio( bool ) {
        this.disableNovoRecordatorio = bool;
    }
    
    functionLoad() {
        this.btnCarregar.emit(true);
    }
}