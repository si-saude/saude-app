import { EventEmitter, SimpleChanges, Component, Input, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MaterializeAction } from "angular2-materialize";
import * as $ from 'jquery';

import { AvaliacaoHigieneOcupacional } from './../../model/avaliacao-higiene-ocupacional';
import { AvaliacaoHigieneOcupacionalBuilder } from './../../controller/avaliacao-higiene-ocupacional/avaliacao-higiene-ocupacional.builder';
import { AvaliacaoHigieneOcupacionalFilter } from './../../controller/avaliacao-higiene-ocupacional/avaliacao-higiene-ocupacional.filter';
import { EmpregadoFilter } from './../../controller/empregado/empregado.filter';

/**
 * Para criar esse modal, deve-se criar as funções open, select e cancel na classe onde ele será utilizado
 */
@Component( {
    selector: 'app-modal-avaliacao-higiene-ocupacional',
    templateUrl: './modal-avaliacao-higiene-ocupacional.html',
    styleUrls: ['./modal-avaliacao-higiene-ocupacional.css']
} )
export class ModalAvaliacaoHigieneOcupacionalComponent{
    @Input() service;
    @Input() showModalAvaliacao;
    @Output() avaliacao: EventEmitter<AvaliacaoHigieneOcupacional>;
    @Output() cancelModalAvaliacao: EventEmitter<boolean>;
    
    private arrayAvaliacao: Array<AvaliacaoHigieneOcupacional>;
    private avaliacaoFilter: AvaliacaoHigieneOcupacionalFilter;
    private chave: string = '';
    private matricula: string = '';
    private nome: string = '';
    
    modalAvaliacao;
    modelParams;

    constructor( router: Router ) {
        this.modalAvaliacao = new EventEmitter<string | MaterializeAction>();
        this.modelParams = [{
            dismissible: true
        }];
        this.avaliacao = new EventEmitter<AvaliacaoHigieneOcupacional>();
        this.cancelModalAvaliacao = new EventEmitter<boolean>();
        this.avaliacaoFilter = new AvaliacaoHigieneOcupacionalFilter();
    }

    ngOnInit() { 
        this.arrayAvaliacao = new AvaliacaoHigieneOcupacionalBuilder().initializeList(new Array<AvaliacaoHigieneOcupacional>());
        this.avaliacaoFilter.setEmpregado(new EmpregadoFilter());
    }
    
    ngOnChanges( changes: SimpleChanges ) {
        if ( changes["showModalAvaliacao"] != undefined && changes["showModalAvaliacao"].currentValue === true )
            setTimeout(() => this.openModalAvaliacao(), 1 );
    }
    
    openModalAvaliacao() {
        this.modalAvaliacao.emit( { action: "modal", params: ['open'] } );
    }
    
    fetchAvaliacoes() {
        this.avaliacaoFilter.setPageNumber(1);
        this.avaliacaoFilter.setPageSize(30);
        console.log(this.avaliacaoFilter)
        this.service.list( this.avaliacaoFilter )
            .then(res => {
                console.log(res.json())
                this.arrayAvaliacao = new AvaliacaoHigieneOcupacionalBuilder().cloneList(res.json().list);
                console.log(this.arrayAvaliacao)
            })
            .catch(error => {
                console.log("Erro ao retornar os eixos.");
            })
    }
    
    selectFilter() {
        let flagSearch: boolean;
        if ( this.chave.length > 3 ) {
            this.avaliacaoFilter.getEmpregado().setChave(this.chave);
            flagSearch = true;
        } else this.avaliacaoFilter.getEmpregado().setChave('');
    
        if ( this.matricula.length > 6 ) {
            this.avaliacaoFilter.getEmpregado().setMatricula(this.matricula);
            flagSearch = true;
        } else this.avaliacaoFilter.getEmpregado().setMatricula('');
    
        if ( this.nome.length > 4 ) {
            this.avaliacaoFilter.getEmpregado().getPessoa().setNome(this.nome);
            flagSearch = true;
        } else this.avaliacaoFilter.getEmpregado().getPessoa().setNome('');
        
        if ( flagSearch ) this.fetchAvaliacoes();
        else this.arrayAvaliacao = [];
    }
    
    selectAvaliacao( avaliacao: AvaliacaoHigieneOcupacional) {
        this.avaliacao.emit(avaliacao);
        this.modalAvaliacao.emit( { action: "modal", params: ['close'] } );
    }
    
    cancelarModalAvaliacao() {
        this.cancelModalAvaliacao.emit(true);
        this.modalAvaliacao.emit( { action: "modal", params: ['close'] } );
    }

    onDestroy() {
        this.modalAvaliacao.emit( { action: "modal", params: ["close"] } );
    }
    
}