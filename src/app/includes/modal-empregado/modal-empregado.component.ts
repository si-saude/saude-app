import { EventEmitter, SimpleChanges, Component, Input, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MaterializeAction } from "angular2-materialize";
import * as $ from 'jquery';

import { Empregado } from './../../model/empregado';
import { EmpregadoBuilder } from './../../controller/empregado/empregado.builder';
import { EmpregadoFilter } from './../../controller/empregado/empregado.filter';import { PessoaFilter } from './../../controller/pessoa/pessoa.filter';
/**
 * Para criar esse modal, deve-se criar as fun��es open, select e cancel na classe onde ele ser� utilizado
 */
@Component( {
    selector: 'app-modal-empregado',
    templateUrl: './modal-empregado.html',
    styleUrls: ['./modal-empregado.css']
} )
export class ModalEmpregadoComponent{
    @Input() service;
    @Input() showModalEmpregado: boolean;
    @Output() empregado: EventEmitter<Empregado>;
    @Output() cancelModalEmpregado: EventEmitter<boolean>;
    private arrayEmpregado: Array<Empregado>;
    private empregadoFilter: EmpregadoFilter;
    private filter;
    private typeFilter;
    private value: string;
    modalEmpregado;
    modelParams;

    constructor( router: Router ) {
        this.modalEmpregado = new EventEmitter<string | MaterializeAction>();
        this.modelParams = [{
            dismissible: true
        }];
        this.empregado = new EventEmitter<Empregado>();
        this.empregadoFilter = new EmpregadoFilter();
        this.cancelModalEmpregado = new EventEmitter<boolean>();
        this.filter = undefined;
    }

    ngOnInit() { 
        this.arrayEmpregado = new EmpregadoBuilder().initializeList(new Array<Empregado>());
    }

    ngOnChanges( changes: SimpleChanges ) {
        if ( changes["showModalEmpregado"] != undefined && changes["showModalEmpregado"].currentValue === true )
            setTimeout(() => this.openModalEmpregado(), 1 );
    }
    
    openModalEmpregado( ) {
        $("input[name='filter-empregado-chave']").val('');
        $("input[name='filter-empregado-nome']").val('');
        this.modalEmpregado.emit( { action: "modal", params: ['open'] } );
    }
    
    fetchEmpregado( ) {
        this.empregadoFilter.setPageNumber(1);
        this.empregadoFilter.setPageSize(Math.pow(2, 31)-1);
        this.service.getEmpregados( this.empregadoFilter )
            .then(res => {
                this.arrayEmpregado = new EmpregadoBuilder().cloneList(res.json().list);
            })
            .catch(error => {
                console.log("Erro ao buscar o empregado");
            })
    }
    
    selectEmpregado( empregado: Empregado) {
        this.empregado.emit(empregado);
        this.modalEmpregado.emit( { action: "modal", params: ['close'] } );
    }
    
    selectFilter( event, tipo ) {
        if ( $('input[name=chave]').val() == '' && $('input[name=pessoa-nome').val() == '' ) {
            this.arrayEmpregado = [];
            this.value == tipo;
        }else if ( tipo == "chave" ) {
            let chave = $('input[name=chave]').val();
            if ( chave.length <= 4 ) {
                if ( this.arrayEmpregado.length == 0 ) {
                    this.empregadoFilter.setChave(event.target.value);
                    this.fetchEmpregado();
                }
            }
        } else {
            let nome = $('input[name=pessoa-nome').val();
                if ( nome.length > 4 ) {
                    if ( this.arrayEmpregado.length == 0 ) {
                        this.empregadoFilter = new EmpregadoFilter();
                        this.empregadoFilter.setPessoa(new PessoaFilter());
                        this.empregadoFilter.getPessoa().setNome(event.target.value);
                        this.fetchEmpregado();
                    }
                }
        }
        this.filter = event.target.value;
        this.typeFilter = tipo;
    }
    
    cancelarModalEmpregado() {
        this.cancelModalEmpregado.emit(true);
        this.modalEmpregado.emit( { action: "modal", params: ['close'] } );
    }

    onDestroy() {
        this.modalEmpregado.emit( { action: "modal", params: ["close"] } );
    }

}