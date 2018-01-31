import { Injectable, EventEmitter } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { ChildGuard } from './../../generics/child.guard';
import { AuthService } from './../../login/auth.service';

@Injectable()
export class IndicadorRiscoAmbientalGuard extends ChildGuard implements CanActivateChild {   
    
    constructor(router: Router) {
        super(router);
    }
    
    canActivateChild(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot
    ): boolean | Observable<boolean> | Promise<boolean> {
        return super.activateChild("indicador-risco-ambiental", route, state);
        
//        if ( state.url.includes("indicador-risco-ambiental") ) {
//            if ( window.localStorage.getItem("INDICADOR-RISCO-AMBIENTAL_LISTAR") !== undefined &&
//                    window.localStorage.getItem("INDICADOR-RISCO-AMBIENTAL_LISTAR") !== null &&
//                    window.localStorage.getItem("INDICADOR-RISCO-AMBIENTAL_LISTAR") !== '' &&
//                    window.localStorage.getItem("INDICADOR-RISCO-AMBIENTAL_LISTAR") == "true" ) {
//                if ( window.localStorage.getItem("INDICADOR-RISCO-AMBIENTAL_REMOVER") !== undefined &&
//                        window.localStorage.getItem("INDICADOR-RISCO-AMBIENTAL_REMOVER") !== null &&
//                        window.localStorage.getItem("INDICADOR-RISCO-AMBIENTAL_REMOVER") !== '' &&
//                        window.localStorage.getItem("INDICADOR-RISCO-AMBIENTAL_REMOVER") == "true" )
//                    this.canRemove = true;
//                else this.canRemove = false;
//                if ( state.url.includes("editar") ) {
//                    if ( window.localStorage.getItem("INDICADOR-RISCO-AMBIENTAL_ALTERAR") !== undefined &&
//                            window.localStorage.getItem("INDICADOR-RISCO-AMBIENTAL_ALTERAR") !== null &&
//                            window.localStorage.getItem("INDICADOR-RISCO-AMBIENTAL_ALTERAR") !== '' &&
//                            window.localStorage.getItem("INDICADOR-RISCO-AMBIENTAL_ALTERAR") == "true" ){
//                        return true;
//                    }
//                    else return false;
//                }
//                if ( state.url.includes("detalhe") ) {
//                    if ( window.localStorage.getItem("INDICADOR-RISCO-AMBIENTAL_DETALHE") !== undefined &&
//                            window.localStorage.getItem("INDICADOR-RISCO-AMBIENTAL_DETALHE") !== null &&
//                            window.localStorage.getItem("INDICADOR-RISCO-AMBIENTAL_DETALHE") !== '' &&
//                            window.localStorage.getItem("INDICADOR-RISCO-AMBIENTAL_DETALHE") == "true" )
//                        return true;
//                    else return false;
//                }
//                if ( state.url.includes("cadastrar") ) {
//                    if ( window.localStorage.getItem("INDICADOR-RISCO-AMBIENTAL_ADICIONAR") !== undefined &&
//                            window.localStorage.getItem("INDICADOR-RISCO-AMBIENTAL_ADICIONAR") !== null &&
//                            window.localStorage.getItem("INDICADOR-RISCO-AMBIENTAL_ADICIONAR") !== '' && 
//                            window.localStorage.getItem("INDICADOR-RISCO-AMBIENTAL_ADICIONAR") == "true" ) {
//                        return true;
//                    } else {
//                        return false;
//                    }
//                }
//                return true;
//            } else return false;
//        }
//        
//        return true;
    }
}
