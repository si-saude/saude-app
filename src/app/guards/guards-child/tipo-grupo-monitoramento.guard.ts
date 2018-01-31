import { Injectable, EventEmitter } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { ChildGuard } from './../../generics/child.guard';
import { AuthService } from './../../login/auth.service';

@Injectable()
export class TipoGrupoMonitoramentoGuard extends ChildGuard implements CanActivateChild {   
    
    constructor(router: Router) {
        super(router);
    }
    
    canActivateChild(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot
    ): boolean | Observable<boolean> | Promise<boolean> {
        return super.activateChild("tipo-grupo-monitoramento", route, state);
        
//        if ( state.url.includes("tipo-grupo-monitoramento") ) {
//            if ( window.localStorage.getItem("TIPO-GRUPO-MONITORAMENTO_LISTAR") !== undefined &&
//                    window.localStorage.getItem("TIPO-GRUPO-MONITORAMENTO_LISTAR") !== null &&
//                    window.localStorage.getItem("TIPO-GRUPO-MONITORAMENTO_LISTAR") !== '' &&
//                    window.localStorage.getItem("TIPO-GRUPO-MONITORAMENTO_LISTAR") == "true" ) {
//                if ( window.localStorage.getItem("TIPO-GRUPO-MONITORAMENTO_REMOVER") !== undefined &&
//                        window.localStorage.getItem("TIPO-GRUPO-MONITORAMENTO_REMOVER") !== null &&
//                        window.localStorage.getItem("TIPO-GRUPO-MONITORAMENTO_REMOVER") !== '' &&
//                        window.localStorage.getItem("TIPO-GRUPO-MONITORAMENTO_REMOVER") == "true" )
//                    this.canRemove = true;
//                else this.canRemove = false;
//                if ( state.url.includes("editar") ) {
//                    if ( window.localStorage.getItem("TIPO-GRUPO-MONITORAMENTO_ALTERAR") !== undefined &&
//                            window.localStorage.getItem("TIPO-GRUPO-MONITORAMENTO_ALTERAR") !== null &&
//                            window.localStorage.getItem("TIPO-GRUPO-MONITORAMENTO_ALTERAR") !== '' &&
//                            window.localStorage.getItem("TIPO-GRUPO-MONITORAMENTO_ALTERAR") == "true" ){
//                        return true;
//                    }
//                    else return false;
//                }
//                if ( state.url.includes("detalhe") ) {
//                    if ( window.localStorage.getItem("TIPO-GRUPO-MONITORAMENTO_DETALHE") !== undefined &&
//                            window.localStorage.getItem("TIPO-GRUPO-MONITORAMENTO_DETALHE") !== null &&
//                            window.localStorage.getItem("TIPO-GRUPO-MONITORAMENTO_DETALHE") !== '' &&
//                            window.localStorage.getItem("TIPO-GRUPO-MONITORAMENTO_DETALHE") == "true" )
//                        return true;
//                    else return false;
//                }
//                if ( state.url.includes("cadastrar") ) {
//                    if ( window.localStorage.getItem("TIPO-GRUPO-MONITORAMENTO_ADICIONAR") !== undefined &&
//                            window.localStorage.getItem("TIPO-GRUPO-MONITORAMENTO_ADICIONAR") !== null &&
//                            window.localStorage.getItem("TIPO-GRUPO-MONITORAMENTO_ADICIONAR") !== '' && 
//                            window.localStorage.getItem("TIPO-GRUPO-MONITORAMENTO_ADICIONAR") == "true" ) {
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
