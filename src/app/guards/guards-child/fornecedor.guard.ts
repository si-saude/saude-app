import { Injectable, EventEmitter } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { ChildGuard } from './../../generics/child.guard';
import { AuthService } from './../../login/auth.service';

@Injectable()
export class FornecedorGuard extends ChildGuard implements CanActivateChild {   
    
    constructor(router: Router) {
        super(router);
    }
    
    canActivateChild(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot
    ): boolean | Observable<boolean> | Promise<boolean> {
        return super.activateChild("fornecedor", route, state);
        
//        if ( state.url.includes("fornecedor") ) {
//            if ( window.localStorage.getItem("FORNECEDOR_LISTAR") !== undefined &&
//                    window.localStorage.getItem("FORNECEDOR_LISTAR") !== null &&
//                    window.localStorage.getItem("FORNECEDOR_LISTAR") !== '' &&
//                    window.localStorage.getItem("FORNECEDOR_LISTAR") == "true" ) {
//                if ( window.localStorage.getItem("FORNECEDOR_REMOVER") !== undefined &&
//                        window.localStorage.getItem("FORNECEDOR_REMOVER") !== null &&
//                        window.localStorage.getItem("FORNECEDOR_REMOVER") !== '' &&
//                        window.localStorage.getItem("FORNECEDOR_REMOVER") == "true" )
//                    this.canRemove = true;
//                else this.canRemove = false;
//                if ( state.url.includes("editar") ) {
//                    if ( window.localStorage.getItem("FORNECEDOR_ALTERAR") !== undefined &&
//                            window.localStorage.getItem("FORNECEDOR_ALTERAR") !== null &&
//                            window.localStorage.getItem("FORNECEDOR_ALTERAR") !== '' &&
//                            window.localStorage.getItem("FORNECEDOR_ALTERAR") == "true" ){
//                        return true;
//                    }
//                    else return false;
//                }
//                if ( state.url.includes("detalhe") ) {
//                    if ( window.localStorage.getItem("FORNECEDOR_DETALHE") !== undefined &&
//                            window.localStorage.getItem("FORNECEDOR_DETALHE") !== null &&
//                            window.localStorage.getItem("FORNECEDOR_DETALHE") !== '' &&
//                            window.localStorage.getItem("FORNECEDOR_DETALHE") == "true" )
//                        return true;
//                    else return false;
//                }
//                if ( state.url.includes("cadastrar") ) {
//                    if ( window.localStorage.getItem("FORNECEDOR_ADICIONAR") !== undefined &&
//                            window.localStorage.getItem("FORNECEDOR_ADICIONAR") !== null &&
//                            window.localStorage.getItem("FORNECEDOR_ADICIONAR") !== '' && 
//                            window.localStorage.getItem("FORNECEDOR_ADICIONAR") == "true" ) {
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
