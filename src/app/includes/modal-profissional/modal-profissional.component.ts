import { EventEmitter, SimpleChanges, Component, Input, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MaterializeAction } from "angular2-materialize";
import * as $ from 'jquery';

import { Profissional } from './../../model/profissional';
import { ProfissionalSaudeBuilder } from './../../controller/profissional-saude/profissional-saude.builder';
import { ProfissionalSaudeFilter } from './../../controller/profissional-saude/profissional-saude.filter';import { EmpregadoFilter } from './../../controller/empregado/empregado.filter';
import { PessoaFilter } from './../../controller/pessoa/pessoa.filter';
/**
 * Para criar esse modal, deve-se criar as fun��es open, select e cancel na classe onde ele ser� utilizado
 */
@Component( {
    selector: 'app-modal-profissional',
    templateUrl: './modal-profissional.html',
    styleUrls: ['./modal-profissional.css']
} )
export class ModalProfissionalComponent{
    @Input() service;
    @Input() showModalProfissional: boolean;
    @Output() profissional: EventEmitter<Profissional>;
    @Output() cancelModalProfissional: EventEmitter<boolean>;
    private arrayProfissionais: Array<Profissional>;
    private profissionalFilter: ProfissionalSaudeFilter;
    private filter;
    private typeFilter;
    private value: string;
    modalProfissional;
    modelParams;

    constructor( router: Router ) {
        this.modalProfissional = new EventEmitter<string | MaterializeAction>();
        this.modelParams = [{
            dismissible: true
        }];
        this.profissional = new EventEmitter<Profissional>();
        this.profissionalFilter = new ProfissionalSaudeFilter();
        this.cancelModalProfissional = new EventEmitter<boolean>();
        this.filter = "";
    }

    ngOnInit() { 
        this.arrayProfissionais = new ProfissionalSaudeBuilder().initializeList(new Array<Profissional>());
    }

    ngOnChanges( changes: SimpleChanges ) {
        if ( changes["showModalProfissional"] != undefined && changes["showModalProfissional"].currentValue === true )
            setTimeout(() => this.openModalProfissional(), 1 );
    }
    
    openModalProfissional( ) {
        $("input[name='filter-Profissional-chave']").val('');
        $("input[name='filter-Profissional-nome']").val('');
        this.modalProfissional.emit( { action: "modal", params: ['open'] } );
    }
    
    fetchProfissional( ) {
        this.profissionalFilter.setPageNumber(1);
        this.profissionalFilter.setPageSize(Math.pow(2, 31)-1);
        this.service.getProfissionais( this.profissionalFilter )
            .then(res => {
                this.arrayProfissionais = new ProfissionalSaudeBuilder().cloneList(res.json().list);
                this.value = "$*build*$";
            })
            .catch(error => {
                console.log("Erro ao buscar o Profissional");
            })
    }
    
    selectProfissional( profissional: Profissional) {
        this.profissional.emit(profissional);
        this.modalProfissional.emit( { action: "modal", params: ['close'] } );
    }
    
    selectFilter( event, tipo ) {
        if ( $('input[name=empregado-chave]').val() == '' && $('input[name=empregado-pessoa-nome').val() == '' ) {
            this.arrayProfissionais = [];
            this.value == "$*build*$";
        } else if ( tipo == "empregado-chave" ) {
            let chave = $('input[name=empregado-chave]').val();
            if ( chave.length <= 4 ) {
                if ( this.arrayProfissionais.length == 0 ) {
                    this.profissionalFilter.setEmpregado(new EmpregadoFilter());
                    this.profissionalFilter.getEmpregado().setChave(event.target.value);
                    this.fetchProfissional();
                }
            }
        } else {
            let nome = $('input[name=empregado-pessoa-nome').val();
                if ( nome.length > 4 ) {
                    if ( this.arrayProfissionais.length == 0 ) {
                        this.profissionalFilter = new ProfissionalSaudeFilter();
                        this.profissionalFilter.setEmpregado(new EmpregadoFilter());
                        this.profissionalFilter.getEmpregado().setPessoa(new PessoaFilter());
                        this.profissionalFilter.getEmpregado().getPessoa().setNome(event.target.value);
                        this.fetchProfissional();
                    }
                }
        }
        this.filter = event;
        this.typeFilter = tipo;
    }
    
    cancelarModalProfissional() {
        this.cancelModalProfissional.emit(true);
        this.modalProfissional.emit( { action: "modal", params: ['close'] } );
    }

    onDestroy() {
        this.modalProfissional.emit( { action: "modal", params: ["close"] } );
    }

}