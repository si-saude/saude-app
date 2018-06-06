import { Component, ViewChild, ElementRef, OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { MaterializeDirective,MaterializeAction } from "angular2-materialize";

import { GlobalVariable } from './../../../global';
import { StatusSolicitacaoConst } from './../../../generics/consts/status-solicitacao.const';
import { SolicitacaoCentralIntegra } from './../../../model/solicitacao-central-integra';
import { TipoSolicitacao } from './../../../model/tipo-solicitacao';
import { TipoSolicitacaoBuilder } from './../../tipo-solicitacao/tipo-solicitacao.builder';
import { Empregado } from './../../../model/empregado';
import { Profissional } from './../../../model/profissional';
import { ProfissionalSaudeBuilder } from './../../../controller/profissional-saude/profissional-saude.builder';
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
    private abertura: any;
    private prazo: any;
    private statuses: Array<string>;
    
    private showModalResponsavel: boolean;
    private showModalCliente: boolean;
    private empregadoFilter: EmpregadoFilter;
    
    constructor( private route: ActivatedRoute,
            private solicitacaoCentralIntegraService: SolicitacaoCentralIntegraService,
            router: Router) { 
            super(solicitacaoCentralIntegraService, router);
            this.goTo = "$*close*$";
            this.solicitacaoCentralIntegra = new SolicitacaoCentralIntegraBuilder().initialize(new SolicitacaoCentralIntegra());
            this.tipoSolicitacoes = new TipoSolicitacaoBuilder().initializeList(new Array<TipoSolicitacao>());
            this.statuses = new Array<string>();
            
            this.showModalCliente = false;
            this.showModalResponsavel = false;
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
                            this.initializeObjects();
                            this.parseDatas();
                        } )
                        .catch( error => {
                            this.catchConfiguration( error );
                        } )
                }
            } );
        this.getTipoSolicitacao();
        this.getStatuses();
    }
    
    getStatuses() {
        this.solicitacaoCentralIntegraService.getStatusSolicitacao()
            .then(res => {
                this.statuses = Object.keys( res.json() ).sort();
            })
            .catch(error => {
                console.log("Erro ao buscar statuses.");
            })
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
    
    initializeObjects() {
        if ( this.solicitacaoCentralIntegra.getTarefa().getResponsavel() == undefined )
            this.solicitacaoCentralIntegra.getTarefa().setResponsavel(
                    new ProfissionalSaudeBuilder().initialize(new Profissional()));
    }
    
    setConcluido() {
        let concluido = <HTMLInputElement>document.getElementById("concluido");
        if ( concluido.checked )
            this.solicitacaoCentralIntegra.setConcluido(true);
        else this.solicitacaoCentralIntegra.setConcluido(false);
    }
    
    
    save() {
        this.validDatas();
        super.save(new SolicitacaoCentralIntegraBuilder().clone(this.solicitacaoCentralIntegra));
    }
    
    validDatas() {
        if ( this.dateUtil.verifyData( this.prazo ) )
            this.solicitacaoCentralIntegra.setPrazo(
                    this.dateUtil.parseDatePickerToDate( this.prazo ) );
        
        if ( this.dateUtil.verifyData( this.abertura ) )
            this.solicitacaoCentralIntegra.setAbertura(
                    this.dateUtil.parseDatePickerToDate( this.abertura ) );
    }
    
    parseDatas() {
        if ( this.dateUtil.verifyData( this.solicitacaoCentralIntegra.getPrazo() ) )
            this.prazo = this.dateUtil.parseDataToObjectDatePicker( this.solicitacaoCentralIntegra.getPrazo() )
        
        if ( this.dateUtil.verifyData( this.solicitacaoCentralIntegra.getAbertura() ) )
            this.abertura = this.dateUtil.parseDataToObjectDatePicker( this.solicitacaoCentralIntegra.getAbertura() )
    }
    
    openModalResponsavel() {
        this.showModalResponsavel = true;
    }
    
    selectResponsavel(responsavel: Profissional) {
        this.solicitacaoCentralIntegra.getTarefa().setResponsavel(responsavel);
        this.showModalResponsavel = false;
    }
    
    cancelarModalResponsavel( valor ) {
        this.showModalResponsavel = false;
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
    
    getMsgConfirmSave(res: any){
        return "Salvo com sucesso.";
    }
}