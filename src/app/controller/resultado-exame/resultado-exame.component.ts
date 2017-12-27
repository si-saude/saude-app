import { Component, ViewChild, ElementRef, EventEmitter } from '@angular/core';

import { MaterializeAction } from "angular2-materialize";

import { ResultadoExame } from './../../model/resultado-exame';
import { ResultadoExameService } from './resultado-exame.service';
import { ResultadoExameFilter } from './resultado-exame.filter';
import { GenericListComponent } from './../../generics/generic.list.component';
import { ResultadoExameGuard } from './../../guards/guards-child/resultado-exame.guard';
import { ResultadoExameImport } from './../../imports/resultado-exame.import';

@Component( {
    selector: 'app-resultado-exame',
    templateUrl: './resultado-exame.component.html',
    styleUrls: ['./resultado-exame.component.css', '../../../assets/css/list-component.css']
} )
export class ResultadoExameComponent extends GenericListComponent<ResultadoExame, ResultadoExameFilter, ResultadoExameGuard> {
    @ViewChild( 'arquivo' ) inputElArquivo: ElementRef;
    inicio: any;
    fim: any;
    resultadoExameService: any;
    modalConfirmImport;
    msnConfirmImport;

    constructor( service: ResultadoExameService, resultadoExameGuard: ResultadoExameGuard ) {
        super( service, new ResultadoExameFilter(), resultadoExameGuard );
        this.resultadoExameService = service;
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
            arquivo  = this.inputElArquivo.nativeElement.files[0];
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

                component.service.sendFileAsObject( resultadoExameImport )
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
