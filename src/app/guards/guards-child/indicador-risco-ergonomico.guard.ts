import { Injectable, EventEmitter } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { ChildGuard } from './../../generics/child.guard';
import { AuthService } from './../../login/auth.service';

@Injectable()
export class IndicadorRiscoErgonomicoGuard extends ChildGuard implements CanActivateChild {   
    
    canActivateChild(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot
    ): boolean | Observable<boolean> | Promise<boolean> {
        if ( state.url.includes("indicador-risco-ergonomico") ) {
            if ( window.localStorage.getItem("INDICADOR-RISCO-ERGONOMICO_LISTAR") !== undefined &&
                    window.localStorage.getItem("INDICADOR-RISCO-ERGONOMICO_LISTAR") !== null &&
                    window.localStorage.getItem("INDICADOR-RISCO-ERGONOMICO_LISTAR") !== '' &&
                    window.localStorage.getItem("INDICADOR-RISCO-ERGONOMICO_LISTAR") == "true" ) {
                if ( window.localStorage.getItem("INDICADOR-RISCO-ERGONOMICO_REMOVER") !== undefined &&
                        window.localStorage.getItem("INDICADOR-RISCO-ERGONOMICO_REMOVER") !== null &&
                        window.localStorage.getItem("INDICADOR-RISCO-ERGONOMICO_REMOVER") !== '' &&
                        window.localStorage.getItem("INDICADOR-RISCO-ERGONOMICO_REMOVER") == "true" )
                    this.canRemove = true;
                else this.canRemove = false;
                if ( state.url.includes("editar") ) {
                    if ( window.localStorage.getItem("INDICADOR-RISCO-ERGONOMICO_ALTERAR") !== undefined &&
                            window.localStorage.getItem("INDICADOR-RISCO-ERGONOMICO_ALTERAR") !== null &&
                            window.localStorage.getItem("INDICADOR-RISCO-ERGONOMICO_ALTERAR") !== '' &&
                            window.localStorage.getItem("INDICADOR-RISCO-ERGONOMICO_ALTERAR") == "true" ){
                        return true;
                    }
                    else return false;
                }
                if ( state.url.includes("detalhe") ) {
                    if ( window.localStorage.getItem("INDICADOR-RISCO-ERGONOMICO_DETALHE") !== undefined &&
                            window.localStorage.getItem("INDICADOR-RISCO-ERGONOMICO_DETALHE") !== null &&
                            window.localStorage.getItem("INDICADOR-RISCO-ERGONOMICO_DETALHE") !== '' &&
                            window.localStorage.getItem("INDICADOR-RISCO-ERGONOMICO_DETALHE") == "true" )
                        return true;
                    else return false;
                }
                if ( state.url.includes("cadastrar") ) {
                    if ( window.localStorage.getItem("INDICADOR-RISCO-ERGONOMICO_ADICIONAR") !== undefined &&
                            window.localStorage.getItem("INDICADOR-RISCO-ERGONOMICO_ADICIONAR") !== null &&
                            window.localStorage.getItem("INDICADOR-RISCO-ERGONOMICO_ADICIONAR") !== '' && 
                            window.localStorage.getItem("INDICADOR-RISCO-ERGONOMICO_ADICIONAR") == "true" ) {
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
