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
import { CheckboxUtil } from './../../generics/utils/checkbox.util'; 
import { Util } from './../../generics/utils/util'; 

@Component({
  selector: 'app-auditoria-resultado-exame',
  templateUrl: './auditoria-resultado-exame.component.html',
  styleUrls: ['./auditoria-resultado-exame.component.css', '../../../assets/css/list-component.css']
})

export class AuditoriaResultadoExameComponent 
    extends GenericListComponent<EmpregadoConvocacao, EmpregadoConvocacaoFilter, AuditoriaResultadoExameGuard> {
    @ViewChild( 'arquivo' ) inputElArquivo: ElementRef;
    @ViewChild( 'arquivoTxt' ) inputElArquivoTxt: ElementRef;
    private resultadoAuditado: CheckboxUtil;
    inicio: any;
    fim: any;
    modalConfirmImport;
    msnConfirmImport;
    resultadoExameImport: ResultadoExameImport;
    params;
    
    constructor(private resultadoExameService: ResultadoExameService, 
                auditoriaResultadoExameService: EmpregadoConvocacaoService,
                auditoriaResultadoExameGuard: AuditoriaResultadoExameGuard,
                router: Router) {
        super(auditoriaResultadoExameService, new EmpregadoConvocacaoFilter(), auditoriaResultadoExameGuard, router);
        this.modalConfirmImport = new EventEmitter<string | MaterializeAction>();
        this.msnConfirmImport = "";
        this.resultadoExameImport = new ResultadoExameImport();
        this.params = GlobalVariable.PARAMS_DATE;
    }
    
    ngAfterViewInit() {
        this.resultadoAuditado = new CheckboxUtil(document.getElementById("resultadoAuditado") as HTMLInputElement);
    }
    
    filtrar() {
        this.filter.getResultadoAuditado().setValue(this.resultadoAuditado.getValue());
        
        this.setFilter();
    }
    
    importar() {
         let arquivo = undefined;

        if ( this.inputElArquivo.nativeElement.files.length > 0 ) {
            arquivo = this.inputElArquivo.nativeElement.files[0];
        }
        let component = this;
              
        if ( arquivo != undefined && Util.isNotNull(this.resultadoExameImport.getInicioCustomDate().getAppDate()) 
             && Util.isNotNull(this.resultadoExameImport.getFimCustomDate().getAppDate())) {
            this.resultadoExameImport.getInicio();
            this.resultadoExameImport.getFim();          
            let readerArquivo = new FileReader();

            readerArquivo.onload = function() {
                let arrayBuffer: ArrayBuffer = readerArquivo.result;
                let array = new Uint8Array( arrayBuffer );
                component.resultadoExameImport.setArquivo( array );
                component.showPreload = true;

                component.resultadoExameService.sendFileAsObject( component.resultadoExameImport )
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
    
    validarTxt() {
        let arquivoTxt = undefined;

        let readerArquivo = new FileReader();
        let component = this;
        
        if ( this.inputElArquivoTxt.nativeElement.files.length > 0 ) {
            arquivoTxt = this.inputElArquivoTxt.nativeElement.files[0];
            this.showPreload = true;
            
            this.resultadoExameService.sendFileWithPath( arquivoTxt, "valid-txt" )
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