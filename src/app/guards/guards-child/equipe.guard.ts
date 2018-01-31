import { Injectable, EventEmitter } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { ChildGuard } from './../../generics/child.guard';
import { AuthService } from './../../login/auth.service';

@Injectable()
export class EquipeGuard extends ChildGuard implements CanActivateChild {   
    
    constructor(router: Router) {
        super(router);
    }
    
    canActivateChild(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot
    ): boolean | Observable<boolean> | Promise<boolean> {
        return super.activateChild("equipe", route, state);
        
//        if ( state.url.includes("equipe") ) {
//            if ( window.localStorage.getItem("EQUIPE_LISTAR") !== undefined &&
//                    window.localStorage.getItem("EQUIPE_LISTAR") !== null &&
//                    window.localStorage.getItem("EQUIPE_LISTAR") !== '' &&
//                    window.localStorage.getItem("EQUIPE_LISTAR") == "true" ) {
//                if ( window.localStorage.getItem("EQUIPE_REMOVER") !== undefined &&
//                        window.localStorage.getItem("EQUIPE_REMOVER") !== null &&
//                        window.localStorage.getItem("EQUIPE_REMOVER") !== '' &&
//                        window.localStorage.getItem("EQUIPE_REMOVER") == "true" )
//                    this.canRemove = true;
//                else this.canRemove = false;
//                if ( state.url.includes("editar") ) {
//                    if ( window.localStorage.getItem("EQUIPE_ALTERAR") !== undefined &&
//                            window.localStorage.getItem("EQUIPE_ALTERAR") !== null &&
//                            window.localStorage.getItem("EQUIPE_ALTERAR") !== '' &&
//                            window.localStorage.getItem("EQUIPE_ALTERAR") == "true" ){
//                        return true;
//                    }
//                    else return false;
//                }
//                if ( state.url.includes("detalhe") ) {
//                    if ( window.localStorage.getItem("EQUIPE_DETALHE") !== undefined &&
//                            window.localStorage.getItem("EQUIPE_DETALHE") !== null &&
//                            window.localStorage.getItem("EQUIPE_DETALHE") !== '' &&
//                            window.localStorage.getItem("EQUIPE_DETALHE") == "true" )
//                        return true;
//                    else return false;
//                }
//                if ( state.url.includes("cadastrar") ) {
//                    if ( window.localStorage.getItem("EQUIPE_ADICIONAR") !== undefined &&
//                            window.localStorage.getItem("EQUIPE_ADICIONAR") !== null &&
//                            window.localStorage.getItem("EQUIPE_ADICIONAR") !== '' && 
//                            window.localStorage.getItem("EQUIPE_ADICIONAR") == "true" ) {
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
