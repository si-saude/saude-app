import { Injectable, EventEmitter } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { ChildGuard } from './../../generics/child.guard';
import { AuthService } from './../../login/auth.service';

@Injectable()
export class GheeGuard extends ChildGuard implements CanActivateChild {   
    
    canActivateChild(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot
    ): boolean | Observable<boolean> | Promise<boolean> {
        if ( state.url.includes("ghee") ) {
            if ( window.localStorage.getItem("GHEE_LISTAR") !== undefined &&
                    window.localStorage.getItem("GHEE_LISTAR") !== null &&
                    window.localStorage.getItem("GHEE_LISTAR") !== '' &&
                    window.localStorage.getItem("GHEE_LISTAR") == "true" ) {
                if ( window.localStorage.getItem("GHEE_REMOVER") !== undefined &&
                        window.localStorage.getItem("GHEE_REMOVER") !== null &&
                        window.localStorage.getItem("GHEE_REMOVER") !== '' &&
                        window.localStorage.getItem("GHEE_REMOVER") == "true" )
                    this.canRemove = true;
                else this.canRemove = false;
                if ( state.url.includes("editar") ) {
                    if ( window.localStorage.getItem("GHEE_ALTERAR") !== undefined &&
                            window.localStorage.getItem("GHEE_ALTERAR") !== null &&
                            window.localStorage.getItem("GHEE_ALTERAR") !== '' &&
                            window.localStorage.getItem("GHEE_ALTERAR") == "true" ){
                        return true;
                    }
                    else return false;
                }
                if ( state.url.includes("detalhe") ) {
                    if ( window.localStorage.getItem("GHEE_DETALHE") !== undefined &&
                            window.localStorage.getItem("GHEE_DETALHE") !== null &&
                            window.localStorage.getItem("GHEE_DETALHE") !== '' &&
                            window.localStorage.getItem("GHEE_DETALHE") == "true" )
                        return true;
                    else return false;
                }
                if ( state.url.includes("cadastrar") ) {
                    if ( window.localStorage.getItem("GHEE_ADICIONAR") !== undefined &&
                            window.localStorage.getItem("GHEE_ADICIONAR") !== null &&
                            window.localStorage.getItem("GHEE_ADICIONAR") !== '' && 
                            window.localStorage.getItem("GHEE_ADICIONAR") == "true" ) {
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
