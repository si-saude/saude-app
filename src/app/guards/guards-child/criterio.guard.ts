import { Injectable, EventEmitter } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { ChildGuard } from './../../generics/child.guard';
import { AuthService } from './../../login/auth.service';

@Injectable()
export class CriterioGuard extends ChildGuard implements CanActivateChild {   
    
    canActivateChild(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot
    ): boolean | Observable<boolean> | Promise<boolean> {
        if ( state.url.includes("criterio") ) {
            if ( window.localStorage.getItem("CRITERIO_LISTAR") !== undefined &&
                    window.localStorage.getItem("CRITERIO_LISTAR") !== null &&
                    window.localStorage.getItem("CRITERIO_LISTAR") !== '' &&
                    window.localStorage.getItem("CRITERIO_LISTAR") == "true" ) {
                if ( window.localStorage.getItem("CRITERIO_REMOVER") !== undefined &&
                        window.localStorage.getItem("CRITERIO_REMOVER") !== null &&
                        window.localStorage.getItem("CRITERIO_REMOVER") !== '' &&
                        window.localStorage.getItem("CRITERIO_REMOVER") == "true" )
                    this.canRemove = true;
                else this.canRemove = false;
                if ( state.url.includes("editar") ) {
                    if ( window.localStorage.getItem("CRITERIO_ALTERAR") !== undefined &&
                            window.localStorage.getItem("CRITERIO_ALTERAR") !== null &&
                            window.localStorage.getItem("CRITERIO_ALTERAR") !== '' &&
                            window.localStorage.getItem("CRITERIO_ALTERAR") == "true" ){
                        return true;
                    }
                    else return false;
                }
                if ( state.url.includes("detalhe") ) {
                    if ( window.localStorage.getItem("CRITERIO_DETALHE") !== undefined &&
                            window.localStorage.getItem("CRITERIO_DETALHE") !== null &&
                            window.localStorage.getItem("CRITERIO_DETALHE") !== '' &&
                            window.localStorage.getItem("CRITERIO_DETALHE") == "true" )
                        return true;
                    else return false;
                }
                if ( state.url.includes("cadastrar") ) {
                    if ( window.localStorage.getItem("CRITERIO_ADICIONAR") !== undefined &&
                            window.localStorage.getItem("CRITERIO_ADICIONAR") !== null &&
                            window.localStorage.getItem("CRITERIO_ADICIONAR") !== '' && 
                            window.localStorage.getItem("CRITERIO_ADICIONAR") == "true" ) {
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
