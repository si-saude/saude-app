import { Injectable, EventEmitter } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { ChildGuard } from './../../generics/child.guard';
import { AuthService } from './../../login/auth.service';

@Injectable()
export class UsuarioGuard extends ChildGuard implements CanActivateChild {   
    
    constructor(router: Router) {
        super(router);
    }
    
    canActivateChild(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot
    ): boolean | Observable<boolean> | Promise<boolean> {
        return super.activateChild("usuario", route, state);
        
//        if ( state.url.includes("usuario") ) {
//            if ( window.localStorage.getItem("USUARIO_LISTAR") !== undefined &&
//                    window.localStorage.getItem("USUARIO_LISTAR") !== null &&
//                    window.localStorage.getItem("USUARIO_LISTAR") !== '' &&
//                    window.localStorage.getItem("USUARIO_LISTAR") == "true" ) {
//                if ( window.localStorage.getItem("USUARIO_REMOVER") !== undefined &&
//                        window.localStorage.getItem("USUARIO_REMOVER") !== null &&
//                        window.localStorage.getItem("USUARIO_REMOVER") !== '' &&
//                        window.localStorage.getItem("USUARIO_REMOVER") == "true" )
//                    this.canRemove = true;
//                else this.canRemove = false;
//                if ( state.url.includes("editar") ) {
//                    if ( window.localStorage.getItem("USUARIO_ALTERAR") !== undefined &&
//                            window.localStorage.getItem("USUARIO_ALTERAR") !== null &&
//                            window.localStorage.getItem("USUARIO_ALTERAR") !== '' &&
//                            window.localStorage.getItem("USUARIO_ALTERAR") == "true" ){
//                        return true;
//                    }
//                    else return false;
//                }
//                if ( state.url.includes("detalhe") ) {
//                    if ( window.localStorage.getItem("USUARIO_DETALHE") !== undefined &&
//                            window.localStorage.getItem("USUARIO_DETALHE") !== null &&
//                            window.localStorage.getItem("USUARIO_DETALHE") !== '' &&
//                            window.localStorage.getItem("USUARIO_DETALHE") == "true" )
//                        return true;
//                    else return false;
//                }
//                if ( state.url.includes("cadastrar") ) {
//                    if ( window.localStorage.getItem("USUARIO_ADICIONAR") !== undefined &&
//                            window.localStorage.getItem("USUARIO_ADICIONAR") !== null &&
//                            window.localStorage.getItem("USUARIO_ADICIONAR") !== '' && 
//                            window.localStorage.getItem("USUARIO_ADICIONAR") == "true" ) {
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
