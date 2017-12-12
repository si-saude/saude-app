import { Injectable, EventEmitter } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { ChildGuard } from './../../generics/child.guard';
import { AuthService } from './../../login/auth.service';

@Injectable()
export class GerenciaGuard extends ChildGuard implements CanActivateChild {   
    
    canActivateChild(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot
    ): boolean | Observable<boolean> | Promise<boolean> {
        if ( state.url.includes("gerencia") ) {
            if ( window.localStorage.getItem("GERENCIA_LISTAR") !== undefined &&
                    window.localStorage.getItem("GERENCIA_LISTAR") !== null &&
                    window.localStorage.getItem("GERENCIA_LISTAR") !== '' &&
                    window.localStorage.getItem("GERENCIA_LISTAR") == "true" ) {
                if ( window.localStorage.getItem("GERENCIA_REMOVER") !== undefined &&
                        window.localStorage.getItem("GERENCIA_REMOVER") !== null &&
                        window.localStorage.getItem("GERENCIA_REMOVER") !== '' &&
                        window.localStorage.getItem("GERENCIA_REMOVER") == "true" )
                    this.canRemove = true;
                else this.canRemove = false;
                if ( state.url.includes("editar") ) {
                    if ( window.localStorage.getItem("GERENCIA_ALTERAR") !== undefined &&
                            window.localStorage.getItem("GERENCIA_ALTERAR") !== null &&
                            window.localStorage.getItem("GERENCIA_ALTERAR") !== '' &&
                            window.localStorage.getItem("GERENCIA_ALTERAR") == "true" ){
                        return true;
                    }
                    else return false;
                }
                if ( state.url.includes("detalhe") ) {
                    if ( window.localStorage.getItem("GERENCIA_DETALHE") !== undefined &&
                            window.localStorage.getItem("GERENCIA_DETALHE") !== null &&
                            window.localStorage.getItem("GERENCIA_DETALHE") !== '' &&
                            window.localStorage.getItem("GERENCIA_DETALHE") == "true" )
                        return true;
                    else return false;
                }
                if ( state.url.includes("cadastrar") ) {
                    if ( window.localStorage.getItem("GERENCIA_ADICIONAR") !== undefined &&
                            window.localStorage.getItem("GERENCIA_ADICIONAR") !== null &&
                            window.localStorage.getItem("GERENCIA_ADICIONAR") !== '' && 
                            window.localStorage.getItem("GERENCIA_ADICIONAR") == "true" ) {
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
