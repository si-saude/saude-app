import { Injectable, EventEmitter } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { ChildGuard } from './../../generics/child.guard';
import { AuthService } from './../../login/auth.service';

@Injectable()
export class VacinaGuard extends ChildGuard implements CanActivateChild {   
    
    constructor(router: Router) {
        super(router);
    }
    
    canActivateChild(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot
    ): boolean | Observable<boolean> | Promise<boolean> {
        return super.activateChild("vacina", route, state);
        
//        if ( state.url.includes("vacina") ) {
//            if ( window.localStorage.getItem("VACINA_LISTAR") !== undefined &&
//                    window.localStorage.getItem("VACINA_LISTAR") !== null &&
//                    window.localStorage.getItem("VACINA_LISTAR") !== '' &&
//                    window.localStorage.getItem("VACINA_LISTAR") == "true" ) {
//                if ( window.localStorage.getItem("VACINA_REMOVER") !== undefined &&
//                        window.localStorage.getItem("VACINA_REMOVER") !== null &&
//                        window.localStorage.getItem("VACINA_REMOVER") !== '' &&
//                        window.localStorage.getItem("VACINA_REMOVER") == "true" )
//                    this.canRemove = true;
//                else this.canRemove = false;
//                if ( state.url.includes("editar") ) {
//                    if ( window.localStorage.getItem("VACINA_ALTERAR") !== undefined &&
//                            window.localStorage.getItem("VACINA_ALTERAR") !== null &&
//                            window.localStorage.getItem("VACINA_ALTERAR") !== '' &&
//                            window.localStorage.getItem("VACINA_ALTERAR") == "true" ){
//                        return true;
//                    }
//                    else return false;
//                }
//                if ( state.url.includes("detalhe") ) {
//                    if ( window.localStorage.getItem("VACINA_DETALHE") !== undefined &&
//                            window.localStorage.getItem("VACINA_DETALHE") !== null &&
//                            window.localStorage.getItem("VACINA_DETALHE") !== '' &&
//                            window.localStorage.getItem("VACINA_DETALHE") == "true" )
//                        return true;
//                    else return false;
//                }
//                if ( state.url.includes("cadastrar") ) {
//                    if ( window.localStorage.getItem("VACINA_ADICIONAR") !== undefined &&
//                            window.localStorage.getItem("VACINA_ADICIONAR") !== null &&
//                            window.localStorage.getItem("VACINA_ADICIONAR") !== '' && 
//                            window.localStorage.getItem("VACINA_ADICIONAR") == "true" ) {
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
