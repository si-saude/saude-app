import { Injectable, EventEmitter } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { ChildGuard } from './../../generics/child.guard';
import { AuthService } from './../../login/auth.service';

@Injectable()
export class IndicadorRiscoAcidenteGuard extends ChildGuard implements CanActivateChild {   
    
    canActivateChild(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot
    ): boolean | Observable<boolean> | Promise<boolean> {
        if ( state.url.includes("indicador-risco-acidente") ) {
            if ( window.localStorage.getItem("INDICADOR-RISCO-ACIDENTE_LISTAR") !== undefined &&
                    window.localStorage.getItem("INDICADOR-RISCO-ACIDENTE_LISTAR") !== null &&
                    window.localStorage.getItem("INDICADOR-RISCO-ACIDENTE_LISTAR") !== '' &&
                    window.localStorage.getItem("INDICADOR-RISCO-ACIDENTE_LISTAR") == "true" ) {
                if ( window.localStorage.getItem("INDICADOR-RISCO-ACIDENTE_REMOVER") !== undefined &&
                        window.localStorage.getItem("INDICADOR-RISCO-ACIDENTE_REMOVER") !== null &&
                        window.localStorage.getItem("INDICADOR-RISCO-ACIDENTE_REMOVER") !== '' &&
                        window.localStorage.getItem("INDICADOR-RISCO-ACIDENTE_REMOVER") == "true" )
                    this.canRemove = true;
                else this.canRemove = false;
                if ( state.url.includes("editar") ) {
                    if ( window.localStorage.getItem("INDICADOR-RISCO-ACIDENTE_ALTERAR") !== undefined &&
                            window.localStorage.getItem("INDICADOR-RISCO-ACIDENTE_ALTERAR") !== null &&
                            window.localStorage.getItem("INDICADOR-RISCO-ACIDENTE_ALTERAR") !== '' &&
                            window.localStorage.getItem("INDICADOR-RISCO-ACIDENTE_ALTERAR") == "true" ){
                        return true;
                    }
                    else return false;
                }
                if ( state.url.includes("detalhe") ) {
                    if ( window.localStorage.getItem("INDICADOR-RISCO-ACIDENTE_DETALHE") !== undefined &&
                            window.localStorage.getItem("INDICADOR-RISCO-ACIDENTE_DETALHE") !== null &&
                            window.localStorage.getItem("INDICADOR-RISCO-ACIDENTE_DETALHE") !== '' &&
                            window.localStorage.getItem("INDICADOR-RISCO-ACIDENTE_DETALHE") == "true" )
                        return true;
                    else return false;
                }
                if ( state.url.includes("cadastrar") ) {
                    if ( window.localStorage.getItem("INDICADOR-RISCO-ACIDENTE_ADICIONAR") !== undefined &&
                            window.localStorage.getItem("INDICADOR-RISCO-ACIDENTE_ADICIONAR") !== null &&
                            window.localStorage.getItem("INDICADOR-RISCO-ACIDENTE_ADICIONAR") !== '' && 
                            window.localStorage.getItem("INDICADOR-RISCO-ACIDENTE_ADICIONAR") == "true" ) {
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
