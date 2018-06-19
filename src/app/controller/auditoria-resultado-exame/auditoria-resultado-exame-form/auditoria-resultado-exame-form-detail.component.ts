import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { MyDatePickerModule } from 'mydatepicker';

import { GlobalVariable } from './../../../global';
import { CampoExame } from './../../../model/campo-exame';
import { CampoExameBuilder } from './../../campo-exame/campo-exame.builder';
import { Exame } from './../../../model/exame';
import { ExameBuilder } from './../../exame/exame.builder';
import { EmpregadoConvocacao } from './../../../model/empregado-convocacao';
import { ResultadoExame } from './../../../model/resultado-exame';
import { ItemResultadoExame } from './../../../model/item-resultado-exame';
import { ItemResultadoExameBuilder } from './../../item-resultado-exame/item-resultado-exame.builder';
import { ResultadoExameBuilder } from './../../resultado-exame/resultado-exame.builder';
import { EmpregadoConvocacaoService } from './../../empregado-convocacao/empregado-convocacao.service';
import { EmpregadoConvocacaoFilter } from './../../empregado-convocacao/empregado-convocacao.filter';
import { EmpregadoConvocacaoBuilder } from './../../empregado-convocacao/empregado-convocacao.builder';
import { GenericFormComponent } from './../../../generics/generic.form.component';

@Component( {
    selector: 'app-auditoria-resultado-exame-form-detail',
    templateUrl: './auditoria-resultado-exame-form-detail.html',
    styleUrls: ['./../../../../assets/css/form-component.css', './auditoria-resultado-exame-form.css']
} )

export class AuditoriaResultadoExameFormDetailComponent extends GenericFormComponent implements OnInit {
    empregadoConvocacao: EmpregadoConvocacao;
    resultadoExame: ResultadoExame;
    campoExames: Array<CampoExame>;
    empregadoConvocacoes: Array<EmpregadoConvocacao>;
    acoes: Array<string>;
    tipos: Array<string>;
    itemResultadoExames: Array<ItemResultadoExame>;
    conformList: Array<boolean>;
    selecionarTodos: boolean;
    canAuditar: boolean;
    empConv: string;

    dataItemResultadoExames: Array<any>;

    selectedExm = null;

    constructor( private route: ActivatedRoute,
        private empregadoConvocacaoService: EmpregadoConvocacaoService,
        router: Router) {
        super( empregadoConvocacaoService, router );
        this.goTo = "auditoria-resultado-exame";
        
        this.empregadoConvocacao = new EmpregadoConvocacaoBuilder().initialize( this.empregadoConvocacao );
        this.resultadoExame = new ResultadoExameBuilder().initialize( this.resultadoExame );
        this.itemResultadoExames = new ItemResultadoExameBuilder().initializeList(this.itemResultadoExames);
        this.conformList = new Array<boolean>();
        this.canAuditar = false;
        this.dataItemResultadoExames = new Array<any>();
        this.campoExames = new CampoExameBuilder().initializeList( this.campoExames );
        this.empregadoConvocacoes = new Array<EmpregadoConvocacao>();
    }
    
    ngOnInit() {
        this.inscricao = this.route.params.subscribe(
                ( params: any ) => {
                    if ( params['id'] !== undefined ) {
                        let id = params['id'];
                        this.showPreload = true;

                        this.empregadoConvocacaoService.get( id )
                            .then( res => {
                                this.showPreload = false;
                                this.empregadoConvocacao = new EmpregadoConvocacaoBuilder().clone( res.json() );
                                this.empConv = this.empregadoConvocacao.getConvocacao().getTitulo() + " - " + this.empregadoConvocacao.getEmpregado().getPessoa().getNome();
                                if (this.empregadoConvocacao.getResultadoExames() != undefined && 
                                        this.empregadoConvocacao.getResultadoExames() != null) {
                                    for (let i=0; i<this.empregadoConvocacao.getResultadoExames().length; i++) {
                                        if ( this.empregadoConvocacao.getResultadoExames()[i].getConforme() == true )
                                            this.conformList[i] = true;
                                        else this.conformList[i] = false; 
                                    }
                                }
                            } )
                            .catch( error => {
                                this.catchConfiguration( error );
                            } )
                    }
                } );
        this.getAcaoResultadoExames();
        this.getTipoResultadoExames();
    }
                
    getAcaoResultadoExames() {
        this.empregadoConvocacaoService.getAcaoResultadoExames()
            .then( res => {
                this.acoes = Object.keys( res.json() ).sort();
            } )
            .catch( error => {
                console.log( error );
            } )
    }
     
    getTipoResultadoExames() {
        this.empregadoConvocacaoService.getTipoResultadoExames()
            .then( res => {
                this.tipos = Object.keys( res.json() ).sort();
            } )
            .catch( error => {
                console.log( error );
            } )
    }
    
    selectConform( value ) {
        setTimeout(() => {
            this.conformList[value] = this.empregadoConvocacao.getEmpregadoConvocacaoExames()[value].getConforme();
        }, 100);
    }

    verifyAuditado() {
        let ret: boolean = this.conformList.find( cL => cL == false );
        if ( ret == undefined ) return true;
        else {
            this.empregadoConvocacao.setAuditado( false );
            return false;
        }
    }
}