import { Injectable, EventEmitter } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { ChildGuard } from './../../generics/child.guard';
import { AuthService } from './../../login/auth.service';

@Injectable()
export class CidadeGuard extends ChildGuard implements CanActivateChild {   
    
    constructor(router: Router) {
        super(router);
    }
    
    canActivateChild(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot
    ): boolean | Observable<boolean> | Promise<boolean> {
        return super.activateChild("cidade", route, state);
        
//        if ( state.url.includes("cidade") ) {
//            if ( window.localStorage.getItem("CIDADE_LISTAR") !== undefined &&
//                    window.localStorage.getItem("CIDADE_LISTAR") !== null &&
//                    window.localStorage.getItem("CIDADE_LISTAR") !== '' &&
//                    window.localStorage.getItem("CIDADE_LISTAR") == "true" ) {
//                if ( window.localStorage.getItem("CIDADE_REMOVER") !== undefined &&
//                        window.localStorage.getItem("CIDADE_REMOVER") !== null &&
//                        window.localStorage.getItem("CIDADE_REMOVER") !== '' &&
//                        window.localStorage.getItem("CIDADE_REMOVER") == "true" )
//                    this.canRemove = true;
//                else this.canRemove = false;
//                if ( state.url.includes("editar") ) {
//                    if ( window.localStorage.getItem("CIDADE_ALTERAR") !== undefined &&
//                            window.localStorage.getItem("CIDADE_ALTERAR") !== null &&
//                            window.localStorage.getItem("CIDADE_ALTERAR") !== '' &&
//                            window.localStorage.getItem("CIDADE_ALTERAR") == "true" ){
//                        return true;
//                    }
//                    else return false;
//                }
//                if ( state.url.includes("detalhe") ) {
//                    if ( window.localStorage.getItem("CIDADE_DETALHE") !== undefined &&
//                            window.localStorage.getItem("CIDADE_DETALHE") !== null &&
//                            window.localStorage.getItem("CIDADE_DETALHE") !== '' &&
//                            window.localStorage.getItem("CIDADE_DETALHE") == "true" )
//                        return true;
//                    else return false;
//                }
//                if ( state.url.includes("cadastrar") ) {
//                    if ( window.localStorage.getItem("CIDADE_ADICIONAR") !== undefined &&
//                            window.localStorage.getItem("CIDADE_ADICIONAR") !== null &&
//                            window.localStorage.getItem("CIDADE_ADICIONAR") !== '' && 
//                            window.localStorage.getItem("CIDADE_ADICIONAR") == "true" ) {
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
