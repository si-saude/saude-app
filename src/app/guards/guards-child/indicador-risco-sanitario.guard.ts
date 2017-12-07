import { Injectable, EventEmitter } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { ChildGuard } from './../../generics/child.guard';
import { AuthService } from './../../login/auth.service';

@Injectable()
export class IndicadorRiscoSanitarioGuard extends ChildGuard implements CanActivateChild {   
    
    canActivateChild(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot
    ): boolean | Observable<boolean> | Promise<boolean> {
        if ( state.url.includes("indicador-risco-sanitario") ) {
            if ( window.localStorage.getItem("INDICADOR-RISCO-SANITARIO_LISTAR") !== undefined &&
                    window.localStorage.getItem("INDICADOR-RISCO-SANITARIO_LISTAR") !== null &&
                    window.localStorage.getItem("INDICADOR-RISCO-SANITARIO_LISTAR") !== '' &&
                    window.localStorage.getItem("INDICADOR-RISCO-SANITARIO_LISTAR") == "true" ) {
                if ( window.localStorage.getItem("INDICADOR-RISCO-SANITARIO_REMOVER") !== undefined &&
                        window.localStorage.getItem("INDICADOR-RISCO-SANITARIO_REMOVER") !== null &&
                        window.localStorage.getItem("INDICADOR-RISCO-SANITARIO_REMOVER") !== '' &&
                        window.localStorage.getItem("INDICADOR-RISCO-SANITARIO_REMOVER") == "true" )
                    this.canRemove = true;
                else this.canRemove = false;
                if ( state.url.includes("editar") ) {
                    if ( window.localStorage.getItem("INDICADOR-RISCO-SANITARIO_ALTERAR") !== undefined &&
                            window.localStorage.getItem("INDICADOR-RISCO-SANITARIO_ALTERAR") !== null &&
                            window.localStorage.getItem("INDICADOR-RISCO-SANITARIO_ALTERAR") !== '' &&
                            window.localStorage.getItem("INDICADOR-RISCO-SANITARIO_ALTERAR") == "true" ){
                        return true;
                    }
                    else return false;
                }
                if ( state.url.includes("detalhe") ) {
                    if ( window.localStorage.getItem("INDICADOR-RISCO-SANITARIO_DETALHE") !== undefined &&
                            window.localStorage.getItem("INDICADOR-RISCO-SANITARIO_DETALHE") !== null &&
                            window.localStorage.getItem("INDICADOR-RISCO-SANITARIO_DETALHE") !== '' &&
                            window.localStorage.getItem("INDICADOR-RISCO-SANITARIO_DETALHE") == "true" )
                        return true;
                    else return false;
                }
                if ( state.url.includes("cadastrar") ) {
                    if ( window.localStorage.getItem("INDICADOR-RISCO-SANITARIO_ADICIONAR") !== undefined &&
                            window.localStorage.getItem("INDICADOR-RISCO-SANITARIO_ADICIONAR") !== null &&
                            window.localStorage.getItem("INDICADOR-RISCO-SANITARIO_ADICIONAR") !== '' && 
                            window.localStorage.getItem("INDICADOR-RISCO-SANITARIO_ADICIONAR") == "true" ) {
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
