import { Injectable, EventEmitter } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { ChildGuard } from './../../generics/child.guard';
import { AuthService } from './../../login/auth.service';

@Injectable()
export class PerfilGuard extends ChildGuard implements CanActivateChild {   
    
    canActivateChild(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot
    ): boolean | Observable<boolean> | Promise<boolean> {
        if ( state.url.includes("perfil") ) {
            if ( window.localStorage.getItem("PERFIL_LISTAR") !== undefined &&
                    window.localStorage.getItem("PERFIL_LISTAR") !== null &&
                    window.localStorage.getItem("PERFIL_LISTAR") !== '' &&
                    window.localStorage.getItem("PERFIL_LISTAR") == "true" ) {
                if ( window.localStorage.getItem("PERFIL_REMOVER") !== undefined &&
                        window.localStorage.getItem("PERFIL_REMOVER") !== null &&
                        window.localStorage.getItem("PERFIL_REMOVER") !== '' &&
                        window.localStorage.getItem("PERFIL_REMOVER") == "true" )
                    this.canRemove = true;
                else this.canRemove = false;
                if ( state.url.includes("editar") ) {
                    if ( window.localStorage.getItem("PERFIL_ALTERAR") !== undefined &&
                            window.localStorage.getItem("PERFIL_ALTERAR") !== null &&
                            window.localStorage.getItem("PERFIL_ALTERAR") !== '' &&
                            window.localStorage.getItem("PERFIL_ALTERAR") == "true" ){
                        return true;
                    }
                    else return false;
                }
                if ( state.url.includes("detalhe") ) {
                    if ( window.localStorage.getItem("PERFIL_DETALHE") !== undefined &&
                            window.localStorage.getItem("PERFIL_DETALHE") !== null &&
                            window.localStorage.getItem("PERFIL_DETALHE") !== '' &&
                            window.localStorage.getItem("PERFIL_DETALHE") == "true" )
                        return true;
                    else return false;
                }
                if ( state.url.includes("cadastrar") ) {
                    if ( window.localStorage.getItem("PERFIL_ADICIONAR") !== undefined &&
                            window.localStorage.getItem("PERFIL_ADICIONAR") !== null &&
                            window.localStorage.getItem("PERFIL_ADICIONAR") !== '' && 
                            window.localStorage.getItem("PERFIL_ADICIONAR") == "true" ) {
                        return true;
                    } else {
                        return false;
                    }
                }
                return true;
            } else return false;
        }
        
        return true;
    }
}
