import { Injectable, EventEmitter } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { ChildGuard } from './../../generics/child.guard';
import { AuthService } from './../../login/auth.service';

@Injectable()
export class RequisitoAsoGuard extends ChildGuard implements CanActivateChild {   
    
    constructor(router: Router) {
        super(router);
    }
    
    canActivateChild(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot
    ): boolean | Observable<boolean> | Promise<boolean> {
        return super.activateChild("requisito-aso", route, state);
        
//        if ( state.url.includes("requisito-aso") ) {
//            if ( window.localStorage.getItem("REQUISITO_ASO_LISTAR") !== undefined &&
//                    window.localStorage.getItem("REQUISITO_ASO_LISTAR") !== null &&
//                    window.localStorage.getItem("REQUISITO_ASO_LISTAR") !== '' &&
//                    window.localStorage.getItem("REQUISITO_ASO_LISTAR") == "true" ) {
//                if ( window.localStorage.getItem("REQUISITO_ASO_REMOVER") !== undefined &&
//                        window.localStorage.getItem("REQUISITO_ASO_REMOVER") !== null &&
//                        window.localStorage.getItem("REQUISITO_ASO_REMOVER") !== '' &&
//                        window.localStorage.getItem("REQUISITO_ASO_REMOVER") == "true" )
//                    this.canRemove = true;
//                else this.canRemove = false;
//                if ( state.url.includes("editar") ) {
//                    if ( window.localStorage.getItem("REQUISITO_ASO_ALTERAR") !== undefined &&
//                            window.localStorage.getItem("REQUISITO_ASO_ALTERAR") !== null &&
//                            window.localStorage.getItem("REQUISITO_ASO_ALTERAR") !== '' &&
//                            window.localStorage.getItem("REQUISITO_ASO_ALTERAR") == "true" ){
//                        return true;
//                    }
//                    else return false;
//                }
//                if ( state.url.includes("detalhe") ) {
//                    if ( window.localStorage.getItem("REQUISITO_ASO_DETALHE") !== undefined &&
//                            window.localStorage.getItem("REQUISITO_ASO_DETALHE") !== null &&
//                            window.localStorage.getItem("REQUISITO_ASO_DETALHE") !== '' &&
//                            window.localStorage.getItem("REQUISITO_ASO_DETALHE") == "true" )
//                        return true;
//                    else return false;
//                }
//                if ( state.url.includes("cadastrar") ) {
//                    if ( window.localStorage.getItem("REQUISITO_ASO_ADICIONAR") !== undefined &&
//                            window.localStorage.getItem("REQUISITO_ASO_ADICIONAR") !== null &&
//                            window.localStorage.getItem("REQUISITO_ASO_ADICIONAR") !== '' && 
//                            window.localStorage.getItem("REQUISITO_ASO_ADICIONAR") == "true" ) {
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
