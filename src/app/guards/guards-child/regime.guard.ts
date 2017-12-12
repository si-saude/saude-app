import { Injectable, EventEmitter } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { ChildGuard } from './../../generics/child.guard';
import { AuthService } from './../../login/auth.service';

@Injectable()
export class RegimeGuard extends ChildGuard implements CanActivateChild {   
    
    canActivateChild(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot
    ): boolean | Observable<boolean> | Promise<boolean> {
        if ( state.url.includes("regime") ) {
            if ( window.localStorage.getItem("REGIME_LISTAR") !== undefined &&
                    window.localStorage.getItem("REGIME_LISTAR") !== null &&
                    window.localStorage.getItem("REGIME_LISTAR") !== '' &&
                    window.localStorage.getItem("REGIME_LISTAR") == "true" ) {
                if ( window.localStorage.getItem("REGIME_REMOVER") !== undefined &&
                        window.localStorage.getItem("REGIME_REMOVER") !== null &&
                        window.localStorage.getItem("REGIME_REMOVER") !== '' &&
                        window.localStorage.getItem("REGIME_REMOVER") == "true" )
                    this.canRemove = true;
                else this.canRemove = false;
                if ( state.url.includes("editar") ) {
                    if ( window.localStorage.getItem("REGIME_ALTERAR") !== undefined &&
                            window.localStorage.getItem("REGIME_ALTERAR") !== null &&
                            window.localStorage.getItem("REGIME_ALTERAR") !== '' &&
                            window.localStorage.getItem("REGIME_ALTERAR") == "true" ){
                        return true;
                    }
                    else return false;
                }
                if ( state.url.includes("detalhe") ) {
                    if ( window.localStorage.getItem("REGIME_DETALHE") !== undefined &&
                            window.localStorage.getItem("REGIME_DETALHE") !== null &&
                            window.localStorage.getItem("REGIME_DETALHE") !== '' &&
                            window.localStorage.getItem("REGIME_DETALHE") == "true" )
                        return true;
                    else return false;
                }
                if ( state.url.includes("cadastrar") ) {
                    if ( window.localStorage.getItem("REGIME_ADICIONAR") !== undefined &&
                            window.localStorage.getItem("REGIME_ADICIONAR") !== null &&
                            window.localStorage.getItem("REGIME_ADICIONAR") !== '' && 
                            window.localStorage.getItem("REGIME_ADICIONAR") == "true" ) {
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
