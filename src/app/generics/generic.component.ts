import { EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { IMyDpOptions } from 'mydatepicker';
import { MaterializeAction } from "angular2-materialize";
import { GlobalVariable } from './../global';

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
    protected modalParams;
    protected router;
    protected globalActions;
    protected toastParams;
    
    constructor( r: Router ) {
        this.router = r;
        this.showPreload = true;
        this.showConfirmSave = false;
        this.msgConfirmSave = "Salvo com sucesso! Ao confirmar, você será redirecionado para a tela de listagem.";
        this.msgPreload = "Aguarde processamento...";     
        this.modalParams = [{
            dismissible: false,
            complete: function() { }
        }];
        this.globalActions = new EventEmitter<string | MaterializeAction>();
        this.toastParams = ['', 4000];     
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

    callToast(text: string, time: number = 4000){
        if(text != undefined ){
            this.toastParams = [text, time];
            this.globalActions.emit('toast');
        }
    }
    
    shortText(text: string, time: number = 4000, qtdChar: number = 10){
        if(text != undefined && text.length > qtdChar)
            return text.substr(0,qtdChar);
        else
            return text;
    }
}






