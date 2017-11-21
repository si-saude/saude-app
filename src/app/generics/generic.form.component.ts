import { ViewChild, EventEmitter, Injector } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { IMyDpOptions } from 'mydatepicker';
import { MaterializeAction } from "angular2-materialize";

import { GenericService } from './generic.service';
import { GenericComponent } from './generic.component';
import { GlobalVariable } from './../global';

export abstract class GenericFormComponent extends GenericComponent {
    titulo: string;
    corTitulo: string = GlobalVariable.COLOR_TITLE;
    inscricao: Subscription;
    protected showPreload: boolean;
    @ViewChild( "form" ) formulario;
    protected modelParams;
    protected modalDeactivate;
    myDatePickerOptions: IMyDpOptions; 
    globalActions;
    toastParams;
    canDeactivate:boolean;

    constructor( protected service: GenericService ) {
        super();
        this.showPreload = false;
        this.showConfirmSave = false;
        this.modalDeactivate = new EventEmitter<string | MaterializeAction>();
        this.myDatePickerOptions = {
                dateFormat: 'dd/mm/yyyy'
            };
        this.globalActions = new EventEmitter<string|MaterializeAction>();
        this.toastParams = ['', 4000];
        this.modelParams = [{
            dismissible: false,
            complete: function() { }
        }];
        this.canDeactivate = false;
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
            this.verifyError = true;
            this.colorError = "red";
            this.msgError = res.text();
        }
        this.showPreload = false;
    }

    parseDataToObjectDatePicker( data ) {
        if ( data === undefined || data === null ) {
            return undefined;
        }
        let s = data.split( "T" );
        let datas = s[0].split( "-" );
        if ( datas[2].substring( 0, 1 ) === "0" ) {
            datas[2] = datas[2].replace( "0", "" );
        }
        if ( datas[1].substring( 0, 1 ) === "0" ) {
            datas[1] = datas[1].replace( "0", "" );
        }
        let o = Object.create( { date: { year: datas[0], month: datas[1], day: datas[2] } } );
        return o;
    }

    parseDatePickerToDate( data ) {
        if ( data === undefined || data === null ) {
            return null;
        } else if ( data instanceof Date ) {
            return data;
        }
        let d: Date = new Date( data.date.year, data.date.month - 1, data.date.day );
        return d;
    }

    parseDataToString( data ) {
        if ( data === undefined || data === null ) {
            return undefined;
        }
        let s = data.split( "T" );
        let datas = s[0].split( "-" );


        return datas[2] + "/" + datas[1] + "/" + datas[0];
    }

    isPossibleDeactivate() {
        if ( this.formulario.dirty && !this.canDeactivate )
            return false;
        return true;
    }
    
    openModalDeactivate() {
        this.modalDeactivate.emit({action:"modal",params:['open']});
    }
    
    confirmDeactivate() {
        
    }
    
    closeModalDeactivate() {
        this.modalDeactivate.emit({action:"modal",params:['close']});
    }
}