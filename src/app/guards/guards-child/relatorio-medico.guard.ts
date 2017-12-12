import { Injectable, EventEmitter } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { ChildGuard } from './../../generics/child.guard';
import { AuthService } from './../../login/auth.service';

@Injectable()
export class RelatorioMedicoGuard extends ChildGuard implements CanActivateChild {   
    
    canActivateChild(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot
    ): boolean | Observable<boolean> | Promise<boolean> {
        if ( state.url.includes("relatorio-medico") ) {
            if ( window.localStorage.getItem("RELATORIO-MEDICO_LISTAR") !== undefined &&
                    window.localStorage.getItem("RELATORIO-MEDICO_LISTAR") !== null &&
                    window.localStorage.getItem("RELATORIO-MEDICO_LISTAR") !== '' &&
                    window.localStorage.getItem("RELATORIO-MEDICO_LISTAR") == "true" ) {
                if ( window.localStorage.getItem("RELATORIO-MEDICO_REMOVER") !== undefined &&
                        window.localStorage.getItem("RELATORIO-MEDICO_REMOVER") !== null &&
                        window.localStorage.getItem("RELATORIO-MEDICO_REMOVER") !== '' &&
                        window.localStorage.getItem("RELATORIO-MEDICO_REMOVER") == "true" )
                    this.canRemove = true;
                else this.canRemove = false;
                if ( state.url.includes("editar") ) {
                    if ( window.localStorage.getItem("RELATORIO-MEDICO_ALTERAR") !== undefined &&
                            window.localStorage.getItem("RELATORIO-MEDICO_ALTERAR") !== null &&
                            window.localStorage.getItem("RELATORIO-MEDICO_ALTERAR") !== '' &&
                            window.localStorage.getItem("RELATORIO-MEDICO_ALTERAR") == "true" ){
                        return true;
                    }
                    else return false;
                }
                if ( state.url.includes("detalhe") ) {
                    if ( window.localStorage.getItem("RELATORIO-MEDICO_DETALHE") !== undefined &&
                            window.localStorage.getItem("RELATORIO-MEDICO_DETALHE") !== null &&
                            window.localStorage.getItem("RELATORIO-MEDICO_DETALHE") !== '' &&
                            window.localStorage.getItem("RELATORIO-MEDICO_DETALHE") == "true" )
                        return true;
                    else return false;
                }
                if ( state.url.includes("cadastrar") ) {
                    if ( window.localStorage.getItem("RELATORIO-MEDICO_ADICIONAR") !== undefined &&
                            window.localStorage.getItem("RELATORIO-MEDICO_ADICIONAR") !== null &&
                            window.localStorage.getItem("RELATORIO-MEDICO_ADICIONAR") !== '' && 
                            window.localStorage.getItem("RELATORIO-MEDICO_ADICIONAR") == "true" ) {
                        return true;
                    } else {
                        return false;
                    }
                }
                return true;
            } else return false;
        }
        
        return true;
    }
}
