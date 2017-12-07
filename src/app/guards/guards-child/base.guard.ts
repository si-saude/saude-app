    import { Injectable, EventEmitter } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { ChildGuard } from './../../generics/child.guard';
import { AuthService } from './../../login/auth.service';

@Injectable()
export class BaseGuard extends ChildGuard implements CanActivateChild {
    
    canActivateChild(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot
    ): boolean | Observable<boolean> | Promise<boolean> {
        if ( state.url.includes("base") ) {
            if ( window.localStorage.getItem("BASE_LISTAR") !== undefined &&
                    window.localStorage.getItem("BASE_LISTAR") !== null &&
                    window.localStorage.getItem("BASE_LISTAR") !== '' &&
                    window.localStorage.getItem("BASE_LISTAR") == "true" ) {
                if ( window.localStorage.getItem("BASE_REMOVER") !== undefined &&
                        window.localStorage.getItem("BASE_REMOVER") !== null &&
                        window.localStorage.getItem("BASE_REMOVER") !== '' &&
                        window.localStorage.getItem("BASE_REMOVER") == "true" ) {
                    this.canRemove = true;
                } else this.canRemove = false;
                if ( state.url.includes("editar") ) {
                    if ( window.localStorage.getItem("BASE_ALTERAR") !== undefined &&
                            window.localStorage.getItem("BASE_ALTERAR") !== null &&
                            window.localStorage.getItem("BASE_ALTERAR") !== '' &&
                            window.localStorage.getItem("BASE_ALTERAR") == "true" )
                        return true;
                    else return false;
                }
                if ( state.url.includes("detalhe") ) {
                    if ( window.localStorage.getItem("BASE_DETALHE") !== undefined &&
                            window.localStorage.getItem("BASE_DETALHE") !== null &&
                            window.localStorage.getItem("BASE_DETALHE") !== '' &&
                            window.localStorage.getItem("BASE_DETALHE") == "true" )
                        return true;
                    else return false;
                }
                if ( state.url.includes("cadastrar") ) {
                    if ( window.localStorage.getItem("BASE_ADICIONAR") !== undefined &&
                            window.localStorage.getItem("BASE_ADICIONAR") !== null &&
                            window.localStorage.getItem("BASE_ADICIONAR") !== '' && 
                            window.localStorage.getItem("BASE_ADICIONAR") == "true" ) {
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
