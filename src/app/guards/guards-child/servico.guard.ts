import { Injectable, EventEmitter } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { ChildGuard } from './../../generics/child.guard';
import { AuthService } from './../../login/auth.service';

@Injectable()
export class ServicoGuard extends ChildGuard implements CanActivateChild {   
    
    canActivateChild(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot
    ): boolean | Observable<boolean> | Promise<boolean> {
        if ( state.url.includes("servico") ) {
            if ( window.localStorage.getItem("SERVICO_LISTAR") !== undefined &&
                    window.localStorage.getItem("SERVICO_LISTAR") !== null &&
                    window.localStorage.getItem("SERVICO_LISTAR") !== '' &&
                    window.localStorage.getItem("SERVICO_LISTAR") == "true" ) {
                if ( window.localStorage.getItem("SERVICO_REMOVER") !== undefined &&
                        window.localStorage.getItem("SERVICO_REMOVER") !== null &&
                        window.localStorage.getItem("SERVICO_REMOVER") !== '' &&
                        window.localStorage.getItem("SERVICO_REMOVER") == "true" )
                    this.canRemove = true;
                else this.canRemove = false;
                if ( state.url.includes("editar") ) {
                    if ( window.localStorage.getItem("SERVICO_ALTERAR") !== undefined &&
                            window.localStorage.getItem("SERVICO_ALTERAR") !== null &&
                            window.localStorage.getItem("SERVICO_ALTERAR") !== '' &&
                            window.localStorage.getItem("SERVICO_ALTERAR") == "true" ){
                        return true;
                    }
                    else return false;
                }
                if ( state.url.includes("detalhe") ) {
                    if ( window.localStorage.getItem("SERVICO_DETALHE") !== undefined &&
                            window.localStorage.getItem("SERVICO_DETALHE") !== null &&
                            window.localStorage.getItem("SERVICO_DETALHE") !== '' &&
                            window.localStorage.getItem("SERVICO_DETALHE") == "true" )
                        return true;
                    else return false;
                }
                if ( state.url.includes("cadastrar") ) {
                    if ( window.localStorage.getItem("SERVICO_ADICIONAR") !== undefined &&
                            window.localStorage.getItem("SERVICO_ADICIONAR") !== null &&
                            window.localStorage.getItem("SERVICO_ADICIONAR") !== '' && 
                            window.localStorage.getItem("SERVICO_ADICIONAR") == "true" ) {
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
