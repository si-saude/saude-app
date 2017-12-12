import { Injectable, EventEmitter } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { ChildGuard } from './../../generics/child.guard';
import { AuthService } from './../../login/auth.service';

@Injectable()
export class ConvocacaoGuard extends ChildGuard implements CanActivateChild {   
    
    canActivateChild(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot
    ): boolean | Observable<boolean> | Promise<boolean> {
        if ( state.url.includes("convocacao") ) {
            if ( window.localStorage.getItem("CONVOCACAO_LISTAR") !== undefined &&
                    window.localStorage.getItem("CONVOCACAO_LISTAR") !== null &&
                    window.localStorage.getItem("CONVOCACAO_LISTAR") !== '' &&
                    window.localStorage.getItem("CONVOCACAO_LISTAR") == "true" ) {
                if ( window.localStorage.getItem("CONVOCACAO_REMOVER") !== undefined &&
                        window.localStorage.getItem("CONVOCACAO_REMOVER") !== null &&
                        window.localStorage.getItem("CONVOCACAO_REMOVER") !== '' &&
                        window.localStorage.getItem("CONVOCACAO_REMOVER") == "true" )
                    this.canRemove = true;
                else this.canRemove = false;
                if ( state.url.includes("editar") ) {
                    if ( window.localStorage.getItem("CONVOCACAO_ALTERAR") !== undefined &&
                            window.localStorage.getItem("CONVOCACAO_ALTERAR") !== null &&
                            window.localStorage.getItem("CONVOCACAO_ALTERAR") !== '' &&
                            window.localStorage.getItem("CONVOCACAO_ALTERAR") == "true" ){
                        return true;
                    }
                    else return false;
                }
                if ( state.url.includes("detalhe") ) {
                    if ( window.localStorage.getItem("CONVOCACAO_DETALHE") !== undefined &&
                            window.localStorage.getItem("CONVOCACAO_DETALHE") !== null &&
                            window.localStorage.getItem("CONVOCACAO_DETALHE") !== '' &&
                            window.localStorage.getItem("CONVOCACAO_DETALHE") == "true" )
                        return true;
                    else return false;
                }
                if ( state.url.includes("cadastrar") ) {
                    if ( window.localStorage.getItem("CONVOCACAO_ADICIONAR") !== undefined &&
                            window.localStorage.getItem("CONVOCACAO_ADICIONAR") !== null &&
                            window.localStorage.getItem("CONVOCACAO_ADICIONAR") !== '' && 
                            window.localStorage.getItem("CONVOCACAO_ADICIONAR") == "true" ) {
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
