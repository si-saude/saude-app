import { Injectable, EventEmitter } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { ChildGuard } from './../../generics/child.guard';
import { AuthService } from './../../login/auth.service';

@Injectable()
export class ExameGuard extends ChildGuard implements CanActivateChild {   
    
    constructor(router: Router) {
        super(router);
    }
    
    canActivateChild(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot
    ): boolean | Observable<boolean> | Promise<boolean> {
        return super.activateChild("exame", route, state);
        
//        if ( state.url.includes("exame") ) {
//            if ( window.localStorage.getItem("EXAME_LISTAR") !== undefined &&
//                    window.localStorage.getItem("EXAME_LISTAR") !== null &&
//                    window.localStorage.getItem("EXAME_LISTAR") !== '' &&
//                    window.localStorage.getItem("EXAME_LISTAR") == "true" ) {
//                if ( window.localStorage.getItem("EXAME_REMOVER") !== undefined &&
//                        window.localStorage.getItem("EXAME_REMOVER") !== null &&
//                        window.localStorage.getItem("EXAME_REMOVER") !== '' &&
//                        window.localStorage.getItem("EXAME_REMOVER") == "true" )
//                    this.canRemove = true;
//                else this.canRemove = false;
//                if ( state.url.includes("editar") ) {
//                    if ( window.localStorage.getItem("EXAME_ALTERAR") !== undefined &&
//                            window.localStorage.getItem("EXAME_ALTERAR") !== null &&
//                            window.localStorage.getItem("EXAME_ALTERAR") !== '' &&
//                            window.localStorage.getItem("EXAME_ALTERAR") == "true" ){
//                        return true;
//                    }
//                    else return false;
//                }
//                if ( state.url.includes("detalhe") ) {
//                    if ( window.localStorage.getItem("EXAME_DETALHE") !== undefined &&
//                            window.localStorage.getItem("EXAME_DETALHE") !== null &&
//                            window.localStorage.getItem("EXAME_DETALHE") !== '' &&
//                            window.localStorage.getItem("EXAME_DETALHE") == "true" )
//                        return true;
//                    else return false;
//                }
//                if ( state.url.includes("cadastrar") ) {
//                    if ( window.localStorage.getItem("EXAME_ADICIONAR") !== undefined &&
//                            window.localStorage.getItem("EXAME_ADICIONAR") !== null &&
//                            window.localStorage.getItem("EXAME_ADICIONAR") !== '' && 
//                            window.localStorage.getItem("EXAME_ADICIONAR") == "true" ) {
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
