import { Router } from '@angular/router';

import { IMyDpOptions } from 'mydatepicker';

import { HTMLStatus } from './../html-status';

export abstract class GenericComponent {
    protected showPreload: boolean;
    protected msgPreload: string;
    protected showConfirmSave: boolean;
    protected msgConfirmSave: string;
    protected goTo: string;
    protected colorError: string;
    protected msgError: string;
    protected verifyError: boolean = false;
    protected myDatePickerOptions: IMyDpOptions;
    protected modalParams;
    
    constructor( private router: Router ) {
        this.showPreload = true;
        this.showConfirmSave = false;
        this.msgConfirmSave = "Salvo com sucesso! Ao confirmar, você será redirecionado para a tela de listagem.";
        this.msgPreload = "Aguarde processamento...";
        this.myDatePickerOptions = {
                dateFormat: 'dd/mm/yyyy'
            };
        this.modalParams = [{
            dismissible: false,
            complete: function() { }
        }];
    }
    
    // verifica se servidor está ligado
    // ainda nao esta funcionando corretamente
    verifyConnection() {
        console.log('verify connection');
        let xhttp = new XMLHttpRequest();
        let component = this;
        try {
            xhttp.onreadystatechange = function() {
                if ( xhttp.readyState == 4 && xhttp.status == 0 ) {
                    localStorage.clear();
                    component.router.navigate(["login"]);
                }
            }
        } catch(e) {
            console.log("catch: ", e);
        }
    }

    catchConfiguration( error ) {
        this.showPreload = false;
        this.verifyError = true;
        this.colorError = "red";
        
        switch ( error.status ) {
            case 401:
                localStorage.clear();
                this.router.navigate(["login"]);
                break;
            case 500:
                this.msgError = "Erro interno do servidor. Por favor, entre em contado com o administrador do sistema.";
                break;
            case 501:
                this.msgError = "Serviço indisponível. Por favor, entre em contado com o administrador do sistema.";
                break;
            default:
                if ( typeof error.text === "function")
                    this.msgError = error.text();
                else this.msgError = error;
                break;
        }

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

}






