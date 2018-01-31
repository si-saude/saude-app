import { Injectable, EventEmitter } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { ChildGuard } from './../../generics/child.guard';
import { AuthService } from './../../login/auth.service';

@Injectable()
export class InstalacaoGuard extends ChildGuard implements CanActivateChild {   
    
    constructor(router: Router) {
        super(router);
    }
    
    canActivateChild(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot
    ): boolean | Observable<boolean> | Promise<boolean> {
        return super.activateChild("instalacao", route, state);
        
//        if ( state.url.includes("instalacao") ) {
//            if ( window.localStorage.getItem("INSTALACAO_LISTAR") !== undefined &&
//                    window.localStorage.getItem("INSTALACAO_LISTAR") !== null &&
//                    window.localStorage.getItem("INSTALACAO_LISTAR") !== '' &&
//                    window.localStorage.getItem("INSTALACAO_LISTAR") == "true" ) {
//                if ( window.localStorage.getItem("INSTALACAO_REMOVER") !== undefined &&
//                        window.localStorage.getItem("INSTALACAO_REMOVER") !== null &&
//                        window.localStorage.getItem("INSTALACAO_REMOVER") !== '' &&
//                        window.localStorage.getItem("INSTALACAO_REMOVER") == "true" )
//                    this.canRemove = true;
//                else this.canRemove = false;
//                if ( state.url.includes("editar") ) {
//                    if ( window.localStorage.getItem("INSTALACAO_ALTERAR") !== undefined &&
//                            window.localStorage.getItem("INSTALACAO_ALTERAR") !== null &&
//                            window.localStorage.getItem("INSTALACAO_ALTERAR") !== '' &&
//                            window.localStorage.getItem("INSTALACAO_ALTERAR") == "true" ){
//                        return true;
//                    }
//                    else return false;
//                }
//                if ( state.url.includes("detalhe") ) {
//                    if ( window.localStorage.getItem("INSTALACAO_DETALHE") !== undefined &&
//                            window.localStorage.getItem("INSTALACAO_DETALHE") !== null &&
//                            window.localStorage.getItem("INSTALACAO_DETALHE") !== '' &&
//                            window.localStorage.getItem("INSTALACAO_DETALHE") == "true" )
//                        return true;
//                    else return false;
//                }
//                if ( state.url.includes("cadastrar") ) {
//                    if ( window.localStorage.getItem("INSTALACAO_ADICIONAR") !== undefined &&
//                            window.localStorage.getItem("INSTALACAO_ADICIONAR") !== null &&
//                            window.localStorage.getItem("INSTALACAO_ADICIONAR") !== '' && 
//                            window.localStorage.getItem("INSTALACAO_ADICIONAR") == "true" ) {
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
