import { Router } from '@angular/router';

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

    constructor() {
        this.showPreload = true;
        this.showConfirmSave = false;
        this.msgConfirmSave = "Salvo com sucesso! Ao confirmar, você será redirecionado para a tela de listagem.";
        this.msgPreload = "Aguarde processamento...";
    }

    catchConfiguration( error ) {
        this.showPreload = false;
        this.verifyError = true;
        this.colorError = "red";
        
        switch ( error.status ) {
            case 400:
                this.msgError = error;
            break;
            case 401:
                localStorage.setItem( 'token', '' );
                this.msgError = "Usuário ou senha inválidos.";
                break;
            case 500:
                this.msgError = "Erro interno do servidor. Por favor, entre em contado com o administrador do sistema.";
                break;
            case 501:
                this.msgError = "Serviço indisponível. Por favor, entre em contado com o administrador do sistema.";
                break;
            default:
                this.msgError = error;
                break;
        }

    }


}






