import { ViewChild, EventEmitter, Injector, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { MaterializeAction } from "angular2-materialize";
import * as $ from 'jquery';

import { GenericService } from './generic.service';
import { GenericComponent } from './generic.component';
import { GlobalVariable } from './../global';

export abstract class GenericFormComponent extends GenericComponent implements OnInit {
    titulo: string;
    corTitulo: string = GlobalVariable.COLOR_TITLE;
    inscricao: Subscription;
    protected showPreload: boolean;
    @ViewChild( "form" ) formulario;
    protected modalDeactivate;
    globalActions;
    toastParams;
    canDeactivate: boolean;

    constructor( protected service: GenericService, router: Router ) {
        super(router);
        this.showPreload = false;
        this.showConfirmSave = false;
        this.modalDeactivate = new EventEmitter<string | MaterializeAction>();
        this.globalActions = new EventEmitter<string | MaterializeAction>();
        this.toastParams = ['', 4000];
        this.canDeactivate = false;
        $(document).keypress(function(event){
            if (event.charCode == 13) return false; 
        });
    }
    
    ngOnInit() {
        console.log('teste');
    }

    isValid() {
    }

    save( object ) {

        this.showPreload = true;
        this.canDeactivate = true;
        this.service.submit( object )
            .then( res => {
                this.processReturn( true, res );
            } )
            .catch( error => {
                this.processReturn( false, error );
            } )
    }

    processReturn( sucess: boolean, res: any ) {
        if ( sucess ) {
            this.msgConfirmSave = res.text();
            this.showConfirmSave = true;
        } else {
            this.catchConfiguration( res );
        }
        this.showPreload = false;
    }

    isPossibleDeactivate() {
        if ( this.formulario.dirty && !this.canDeactivate )
            return false;
        return true;
    }

    openModalDeactivate() {
        this.modalDeactivate.emit( { action: "modal", params: ['open'] } );
    }

    confirmDeactivate() {

    }

    closeModalDeactivate() {
        this.modalDeactivate.emit( { action: "modal", params: ['close'] } );
    }
    
    downloadFile( data, fileName ) {
        let byteCharacters = atob(data._body);
        let byteArrays = [];
        let sliceSize = 1024;

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            let slice = byteCharacters.slice(offset, offset + sliceSize);

            let byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            let byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }

        let blob = new Blob(byteArrays);
        let url = window.URL.createObjectURL(blob);
        var anchor = document.createElement("a");
        anchor.download = fileName;
        anchor.href = url;
        document.body.appendChild(anchor);
        anchor.click();
    }
}