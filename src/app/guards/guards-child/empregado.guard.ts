import { Injectable, EventEmitter } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { ChildGuard } from './../../generics/child.guard';
import { AuthService } from './../../login/auth.service';

@Injectable()
export class EmpregadoGuard extends ChildGuard implements CanActivateChild {   
    
    canActivateChild(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot
    ): boolean | Observable<boolean> | Promise<boolean> {
        if ( state.url.includes("empregado") ) {
            if ( window.localStorage.getItem("EMPREGADO_LISTAR") !== undefined &&
                    window.localStorage.getItem("EMPREGADO_LISTAR") !== null &&
                    window.localStorage.getItem("EMPREGADO_LISTAR") !== '' &&
                    window.localStorage.getItem("EMPREGADO_LISTAR") == "true" ) {
                if ( window.localStorage.getItem("EMPREGADO_REMOVER") !== undefined &&
                        window.localStorage.getItem("EMPREGADO_REMOVER") !== null &&
                        window.localStorage.getItem("EMPREGADO_REMOVER") !== '' &&
                        window.localStorage.getItem("EMPREGADO_REMOVER") == "true" )
                    this.canRemove = true;
                else this.canRemove = false;
                if ( state.url.includes("editar") ) {
                    if ( window.localStorage.getItem("EMPREGADO_ALTERAR") !== undefined &&
                            window.localStorage.getItem("EMPREGADO_ALTERAR") !== null &&
                            window.localStorage.getItem("EMPREGADO_ALTERAR") !== '' &&
                            window.localStorage.getItem("EMPREGADO_ALTERAR") == "true" ){
                        return true;
                    }
                    else return false;
                }
                if ( state.url.includes("detalhe") ) {
                    if ( window.localStorage.getItem("EMPREGADO_DETALHE") !== undefined &&
                            window.localStorage.getItem("EMPREGADO_DETALHE") !== null &&
                            window.localStorage.getItem("EMPREGADO_DETALHE") !== '' &&
                            window.localStorage.getItem("EMPREGADO_DETALHE") == "true" )
                        return true;
                    else return false;
                }
                if ( state.url.includes("cadastrar") ) {
                    if ( window.localStorage.getItem("EMPREGADO_ADICIONAR") !== undefined &&
                            window.localStorage.getItem("EMPREGADO_ADICIONAR") !== null &&
                            window.localStorage.getItem("EMPREGADO_ADICIONAR") !== '' && 
                            window.localStorage.getItem("EMPREGADO_ADICIONAR") == "true" ) {
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
