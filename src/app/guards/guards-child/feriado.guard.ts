import { Injectable, EventEmitter } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { ChildGuard } from './../../generics/child.guard';
import { AuthService } from './../../login/auth.service';

@Injectable()
export class FeriadoGuard extends ChildGuard implements CanActivateChild {   
    
    canActivateChild(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot
    ): boolean | Observable<boolean> | Promise<boolean> {
        if ( state.url.includes("feriado") ) {
            if ( window.localStorage.getItem("FERIADO_LISTAR") !== undefined &&
                    window.localStorage.getItem("FERIADO_LISTAR") !== null &&
                    window.localStorage.getItem("FERIADO_LISTAR") !== '' &&
                    window.localStorage.getItem("FERIADO_LISTAR") == "true" ) {
                if ( window.localStorage.getItem("FERIADO_REMOVER") !== undefined &&
                        window.localStorage.getItem("FERIADO_REMOVER") !== null &&
                        window.localStorage.getItem("FERIADO_REMOVER") !== '' &&
                        window.localStorage.getItem("FERIADO_REMOVER") == "true" )
                    this.canRemove = true;
                else this.canRemove = false;
                if ( state.url.includes("editar") ) {
                    if ( window.localStorage.getItem("FERIADO_ALTERAR") !== undefined &&
                            window.localStorage.getItem("FERIADO_ALTERAR") !== null &&
                            window.localStorage.getItem("FERIADO_ALTERAR") !== '' &&
                            window.localStorage.getItem("FERIADO_ALTERAR") == "true" ){
                        return true;
                    }
                    else return false;
                }
                if ( state.url.includes("detalhe") ) {
                    if ( window.localStorage.getItem("FERIADO_DETALHE") !== undefined &&
                            window.localStorage.getItem("FERIADO_DETALHE") !== null &&
                            window.localStorage.getItem("FERIADO_DETALHE") !== '' &&
                            window.localStorage.getItem("FERIADO_DETALHE") == "true" )
                        return true;
                    else return false;
                }
                if ( state.url.includes("cadastrar") ) {
                    if ( window.localStorage.getItem("FERIADO_ADICIONAR") !== undefined &&
                            window.localStorage.getItem("FERIADO_ADICIONAR") !== null &&
                            window.localStorage.getItem("FERIADO_ADICIONAR") !== '' && 
                            window.localStorage.getItem("FERIADO_ADICIONAR") == "true" ) {
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
