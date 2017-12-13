import { Injectable, EventEmitter } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { ChildGuard } from './../../generics/child.guard';
import { AuthService } from './../../login/auth.service';

@Injectable()
export class EmpregadoConvocacaoGuard extends ChildGuard implements CanActivateChild {   
    
    canActivateChild(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot
    ): boolean | Observable<boolean> | Promise<boolean> {
        if ( state.url.includes("empregado-convocacao") ) {
            if ( window.localStorage.getItem("EMPREGADO_CONVOCACAO_LISTAR") !== undefined &&
                    window.localStorage.getItem("EMPREGADO_CONVOCACAO_LISTAR") !== null &&
                    window.localStorage.getItem("EMPREGADO_CONVOCACAO_LISTAR") !== '' &&
                    window.localStorage.getItem("EMPREGADO_CONVOCACAO_LISTAR") == "true" ) {
                if ( state.url.includes("editar") ) {
                    if ( window.localStorage.getItem("EMPREGADO_CONVOCACAO_ALTERAR") !== undefined &&
                            window.localStorage.getItem("EMPREGADO_CONVOCACAO_ALTERAR") !== null &&
                            window.localStorage.getItem("EMPREGADO_CONVOCACAO_ALTERAR") !== '' &&
                            window.localStorage.getItem("EMPREGADO_CONVOCACAO_ALTERAR") == "true" ){
                        return true;
                    }
                    else return false;
                }
                if ( state.url.includes("detalhe") ) {
                    if ( window.localStorage.getItem("EMPREGADO_CONVOCACAO_DETALHE") !== undefined &&
                            window.localStorage.getItem("EMPREGADO_CONVOCACAO_DETALHE") !== null &&
                            window.localStorage.getItem("EMPREGADO_CONVOCACAO_DETALHE") !== '' &&
                            window.localStorage.getItem("EMPREGADO_CONVOCACAO_DETALHE") == "true" )
                        return true;
                    else return false;
                }
                return true;
            } else return false;
        }
        
        return true;
    }
}
