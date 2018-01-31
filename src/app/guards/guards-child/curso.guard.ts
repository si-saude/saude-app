import { Injectable, EventEmitter } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { ChildGuard } from './../../generics/child.guard';
import { AuthService } from './../../login/auth.service';

@Injectable()
export class CursoGuard extends ChildGuard implements CanActivateChild {   
    
    constructor(router: Router) {
        super(router);
    }
    
    canActivateChild(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot
    ): boolean | Observable<boolean> | Promise<boolean> {
        return super.activateChild("curso", route, state);
        
//            if ( window.localStorage.getItem("CURSO_LISTAR") !== undefined &&
//                    window.localStorage.getItem("CURSO_LISTAR") !== null &&
//                    window.localStorage.getItem("CURSO_LISTAR") !== '' &&
//                    window.localStorage.getItem("CURSO_LISTAR") == "true" ) {
//                if ( window.localStorage.getItem("CURSO_REMOVER") !== undefined &&
//                        window.localStorage.getItem("CURSO_REMOVER") !== null &&
//                        window.localStorage.getItem("CURSO_REMOVER") !== '' &&
//                        window.localStorage.getItem("CURSO_REMOVER") == "true" )
//                    this.canRemove = true;
//                else this.canRemove = false;
//                if ( state.url.includes("editar") ) {
//                    if ( window.localStorage.getItem("CURSO_ALTERAR") !== undefined &&
//                            window.localStorage.getItem("CURSO_ALTERAR") !== null &&
//                            window.localStorage.getItem("CURSO_ALTERAR") !== '' &&
//                            window.localStorage.getItem("CURSO_ALTERAR") == "true" ){
//                        return true;
//                    }
//                    else return false;
//                }
//                if ( state.url.includes("detalhe") ) {
//                    if ( window.localStorage.getItem("CURSO_DETALHE") !== undefined &&
//                            window.localStorage.getItem("CURSO_DETALHE") !== null &&
//                            window.localStorage.getItem("CURSO_DETALHE") !== '' &&
//                            window.localStorage.getItem("CURSO_DETALHE") == "true" )
//                        return true;
//                    else return false;
//                }
//                if ( state.url.includes("cadastrar") ) {
//                    if ( window.localStorage.getItem("CURSO_ADICIONAR") !== undefined &&
//                            window.localStorage.getItem("CURSO_ADICIONAR") !== null &&
//                            window.localStorage.getItem("CURSO_ADICIONAR") !== '' && 
//                            window.localStorage.getItem("CURSO_ADICIONAR") == "true" ) {
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
