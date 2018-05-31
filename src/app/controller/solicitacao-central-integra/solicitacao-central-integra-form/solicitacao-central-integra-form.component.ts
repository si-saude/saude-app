import { Component, ViewChild, ElementRef, OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { MaterializeDirective,MaterializeAction } from "angular2-materialize";

import { GlobalVariable } from './../../../global';
import { SolicitacaoCentralIntegra } from './../../../model/solicitacao-central-integra';
import { TipoSolicitacao } from './../../../model/tipo-solicitacao';
import { TipoSolicitacaoBuilder } from './../../tipo-solicitacao/tipo-solicitacao.builder';
import { Empregado } from './../../../model/empregado';
import { EmpregadoBuilder } from './../../../controller/empregado/empregado.builder';
import { EmpregadoFilter } from './../../../controller/empregado/empregado.filter';
import { SolicitacaoCentralIntegraBuilder } from './../solicitacao-central-integra.builder';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { SolicitacaoCentralIntegraService } from './../solicitacao-central-integra.service';

@Component( {
    selector: 'app-solicitacao-central-integra-form',
    templateUrl: './solicitacao-central-integra-form.html',
    styleUrls: ['./solicitacao-central-integra-form.css', './../../../../assets/css/form-component.css']
} )
export class SolicitacaoCentralIntegraFormComponent extends GenericFormComponent implements OnInit {
    private solicitacaoCentralIntegra: SolicitacaoCentralIntegra;
    private tipoSolicitacoes: Array<TipoSolicitacao>;
    private inicio: any;
    private prazo: any;

    private validEmpregado: string;
    private empregados: Array<Empregado>;
    private autocompleteEmpregado;
    
    private showModalCliente: boolean;
    private empregadoFilter: EmpregadoFilter;
    
    constructor( private route: ActivatedRoute,
            private solicitacaoCentralIntegraService: SolicitacaoCentralIntegraService,
            router: Router) { 
            super(solicitacaoCentralIntegraService, router);
            this.goTo = "solicitacao-central-integra";
            this.solicitacaoCentralIntegra = new SolicitacaoCentralIntegraBuilder().initialize(new SolicitacaoCentralIntegra());
            this.tipoSolicitacoes = new TipoSolicitacaoBuilder().initializeList(new Array<TipoSolicitacao>());
            
            this.empregados = new Array<Empregado>();
            this.validEmpregado = "";
            this.autocompleteEmpregado = [];
            this.showModalCliente = false;
    }
    
    ngOnInit() {
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                if( params['id'] !== undefined ) {
                    let id = params['id'];
                    this.showPreload = true;

                    this.solicitacaoCentralIntegraService.get( id )
                        .then( res => {
                            this.showPreload = false;
                            this.solicitacaoCentralIntegra = new SolicitacaoCentralIntegraBuilder().clone(res.json());
                            this.parseDatas();
                        } )
                        .catch( error => {
                            this.catchConfiguration( error );
                        } )
                }
            } );
        this.getTipoSolicitacao();
    }
    
    getTipoSolicitacao() {
        this.solicitacaoCentralIntegraService.getTipoSolicitacoes()
            .then(res => {
                this.tipoSolicitacoes = new TipoSolicitacaoBuilder().cloneList(res.json());
            })
            .catch(error => {
                console.log(error);
            })
    }
    
    save() {
        this.validDatas();
        super.save(new SolicitacaoCentralIntegraBuilder().clone(this.solicitacaoCentralIntegra));
    }
    
    validDatas() {
        if ( this.dateUtil.verifyData( this.prazo ) )
            this.solicitacaoCentralIntegra.setPrazo(
                    this.dateUtil.parseDatePickerToDate( this.prazo ) );
        
        if ( this.dateUtil.verifyData( this.inicio ) )
            this.solicitacaoCentralIntegra.getTarefa().setInicio(
                    this.dateUtil.parseDatePickerToDate( this.inicio ) );
    }
    
    parseDatas() {
        if ( this.dateUtil.verifyData( this.solicitacaoCentralIntegra.getPrazo() ) )
            this.dateUtil.parseDataToObjectDatePicker( this.solicitacaoCentralIntegra.getPrazo() )
        
        if ( this.dateUtil.verifyData( this.solicitacaoCentralIntegra.getTarefa().getInicio() ) )
            this.dateUtil.parseDataToObjectDatePicker( this.solicitacaoCentralIntegra.getTarefa().getInicio() )
    }
    
    openModalCliente() {
        this.showModalCliente = true;
    }
    
    selectCliente(cliente: Empregado) {
        this.solicitacaoCentralIntegra.getTarefa().setCliente(cliente);
        this.showModalCliente = false;
    }
    
    cancelarModalCliente( valor ) {
        this.showModalCliente = false;
    }
}