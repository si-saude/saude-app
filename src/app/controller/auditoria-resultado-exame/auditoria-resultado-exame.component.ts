import { Component, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { MaterializeAction } from "angular2-materialize";

import { GlobalVariable } from './../../global';
import { EmpregadoConvocacao } from './../../model/empregado-convocacao';
import { EmpregadoConvocacaoService } from './../empregado-convocacao/empregado-convocacao.service';
import { EmpregadoConvocacaoFilter } from './../empregado-convocacao/empregado-convocacao.filter';
import { AuditoriaResultadoExameGuard } from './../../guards/guards-child/auditoria-resultado-exame.guard';
import { ResultadoExameService } from './../resultado-exame/resultado-exame.service';
import { ResultadoExameImport } from './../../imports/resultado-exame.import';
import { GenericListComponent } from './../../generics/generic.list.component';

@Component({
  selector: 'app-auditoria-resultado-exame',
  templateUrl: './auditoria-resultado-exame.component.html',
  styleUrls: ['./auditoria-resultado-exame.component.css', '../../../assets/css/list-component.css']
})

export class AuditoriaResultadoExameComponent 
    extends GenericListComponent<EmpregadoConvocacao, EmpregadoConvocacaoFilter, AuditoriaResultadoExameGuard> {
    @ViewChild( 'arquivo' ) inputElArquivo: ElementRef;
    @ViewChild( 'arquivoTxt' ) inputElArquivoTxt: ElementRef;
    inicio: any;
    fim: any;
    modalConfirmImport;
    msnConfirmImport;
    
    constructor(private resultadoExameService: ResultadoExameService, 
                auditoriaResultadoExameService: EmpregadoConvocacaoService,
                auditoriaResultadoExameGuard: AuditoriaResultadoExameGuard,
                router: Router) {
        super(auditoriaResultadoExameService, new EmpregadoConvocacaoFilter(), auditoriaResultadoExameGuard, router);
        this.modalConfirmImport = new EventEmitter<string | MaterializeAction>();
        this.msnConfirmImport = "";
    }   
    
    importar() {
        let dateInicio = null;
        let dateFim = null;
        if ( this.inicio != undefined )
            dateInicio = this.parseDatePickerToDate( this.inicio );
        else return;
        if ( this.fim != undefined )
            dateFim = this.parseDatePickerToDate( this.fim );
        else return;

        let arquivo = undefined;

        if ( this.inputElArquivo.nativeElement.files.length > 0 ) {
            arquivo = this.inputElArquivo.nativeElement.files[0];
        }
        let component = this;
        let resultadoExameImport: ResultadoExameImport = new ResultadoExameImport();

        if ( arquivo != undefined ) {
            let readerArquivo = new FileReader();

            readerArquivo.onload = function() {
                let arrayBuffer: ArrayBuffer = readerArquivo.result;
                let array = new Uint8Array( arrayBuffer );
                resultadoExameImport.setArquivo( array );
                resultadoExameImport.setInicio( dateInicio );
                resultadoExameImport.setFim( dateFim );
                component.showPreload = true;

                component.resultadoExameService.sendFileAsObject( resultadoExameImport )
                    .then( res => {
                        component.showPreload = false;
                        component.openModalConfirmImport();
                        component.msnConfirmImport = res.text();
                    } )
                    .catch( error => {
                        component.showPreload = false;
                        component.openModalConfirmImport();
                        component.msnConfirmImport = error;
                    } )
            }

            readerArquivo.readAsArrayBuffer( new Blob( [arquivo] ) );
        }
    }

    importarTxt() {
        let arquivoTxt = undefined;

        let readerArquivo = new FileReader();
        let component = this;
        
        if ( this.inputElArquivoTxt.nativeElement.files.length > 0 ) {
            arquivoTxt = this.inputElArquivoTxt.nativeElement.files[0];
            this.showPreload = true;
            
            this.resultadoExameService.sendFileWithPath( arquivoTxt, "import-txt" )
                .then( res => {
                    component.showPreload = false;
                    component.openModalConfirmImport();
                    component.msnConfirmImport = res.text();
                } )
                .catch( error => {
                    component.showPreload = false;
                    component.openModalConfirmImport();
                    component.msnConfirmImport = error;
                } )
        }

    }

    confirmImport() {
        location.reload();
    }

    openModalConfirmImport() {
        this.modalConfirmImport.emit( { action: "modal", params: ['open'] } );
    }

    closeModalConfirmImport() {
        this.modalConfirmImport.emit( { action: "modal", params: ['close'] } );
    }
}