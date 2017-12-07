import { Injectable, EventEmitter } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { ChildGuard } from './../../generics/child.guard';
import { AuthService } from './../../login/auth.service';

@Injectable()
export class FuncaoGuard extends ChildGuard implements CanActivateChild {   
    
    canActivateChild(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot
    ): boolean | Observable<boolean> | Promise<boolean> {
        if ( state.url.includes("funcao") ) {
            if ( window.localStorage.getItem("FUNCAO_LISTAR") !== undefined &&
                    window.localStorage.getItem("FUNCAO_LISTAR") !== null &&
                    window.localStorage.getItem("FUNCAO_LISTAR") !== '' &&
                    window.localStorage.getItem("FUNCAO_LISTAR") == "true" ) {
                if ( window.localStorage.getItem("FUNCAO_REMOVER") !== undefined &&
                        window.localStorage.getItem("FUNCAO_REMOVER") !== null &&
                        window.localStorage.getItem("FUNCAO_REMOVER") !== '' &&
                        window.localStorage.getItem("FUNCAO_REMOVER") == "true" )
                    this.canRemove = true;
                else this.canRemove = false;
                if ( state.url.includes("editar") ) {
                    if ( window.localStorage.getItem("FUNCAO_ALTERAR") !== undefined &&
                            window.localStorage.getItem("FUNCAO_ALTERAR") !== null &&
                            window.localStorage.getItem("FUNCAO_ALTERAR") !== '' &&
                            window.localStorage.getItem("FUNCAO_ALTERAR") == "true" ){
                        return true;
                    }
                    else return false;
                }
                if ( state.url.includes("detalhe") ) {
                    if ( window.localStorage.getItem("FUNCAO_DETALHE") !== undefined &&
                            window.localStorage.getItem("FUNCAO_DETALHE") !== null &&
                            window.localStorage.getItem("FUNCAO_DETALHE") !== '' &&
                            window.localStorage.getItem("FUNCAO_DETALHE") == "true" )
                        return true;
                    else return false;
                }
                if ( state.url.includes("cadastrar") ) {
                    if ( window.localStorage.getItem("FUNCAO_ADICIONAR") !== undefined &&
                            window.localStorage.getItem("FUNCAO_ADICIONAR") !== null &&
                            window.localStorage.getItem("FUNCAO_ADICIONAR") !== '' && 
                            window.localStorage.getItem("FUNCAO_ADICIONAR") == "true" ) {
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
