import { Injectable, EventEmitter } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { ChildGuard } from './../../generics/child.guard';
import { AuthService } from './../../login/auth.service';

@Injectable()
export class GheGuard extends ChildGuard implements CanActivateChild {   
    
    canActivateChild(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot
    ): boolean | Observable<boolean> | Promise<boolean> {
        if ( state.url.includes("ghe") ) {
            if ( window.localStorage.getItem("GHE_LISTAR") !== undefined &&
                    window.localStorage.getItem("GHE_LISTAR") !== null &&
                    window.localStorage.getItem("GHE_LISTAR") !== '' &&
                    window.localStorage.getItem("GHE_LISTAR") == "true" ) {
                if ( window.localStorage.getItem("GHE_REMOVER") !== undefined &&
                        window.localStorage.getItem("GHE_REMOVER") !== null &&
                        window.localStorage.getItem("GHE_REMOVER") !== '' &&
                        window.localStorage.getItem("GHE_REMOVER") == "true" )
                    this.canRemove = true;
                else this.canRemove = false;
                if ( state.url.includes("editar") ) {
                    if ( window.localStorage.getItem("GHE_ALTERAR") !== undefined &&
                            window.localStorage.getItem("GHE_ALTERAR") !== null &&
                            window.localStorage.getItem("GHE_ALTERAR") !== '' &&
                            window.localStorage.getItem("GHE_ALTERAR") == "true" ){
                        return true;
                    }
                    else return false;
                }
                if ( state.url.includes("detalhe") ) {
                    if ( window.localStorage.getItem("GHE_DETALHE") !== undefined &&
                            window.localStorage.getItem("GHE_DETALHE") !== null &&
                            window.localStorage.getItem("GHE_DETALHE") !== '' &&
                            window.localStorage.getItem("GHE_DETALHE") == "true" )
                        return true;
                    else return false;
                }
                if ( state.url.includes("cadastrar") ) {
                    if ( window.localStorage.getItem("GHE_ADICIONAR") !== undefined &&
                            window.localStorage.getItem("GHE_ADICIONAR") !== null &&
                            window.localStorage.getItem("GHE_ADICIONAR") !== '' && 
                            window.localStorage.getItem("GHE_ADICIONAR") == "true" ) {
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
