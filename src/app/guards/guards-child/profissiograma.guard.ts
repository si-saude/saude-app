import { Injectable, EventEmitter } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { ChildGuard } from './../../generics/child.guard';
import { AuthService } from './../../login/auth.service';

@Injectable()
export class ProfissiogramaGuard extends ChildGuard implements CanActivateChild {   
    
    canActivateChild(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot
    ): boolean | Observable<boolean> | Promise<boolean> {
        if ( state.url.includes("profissiograma") ) {
            if ( window.localStorage.getItem("PROFISSIOGRAMA_LISTAR") !== undefined &&
                    window.localStorage.getItem("PROFISSIOGRAMA_LISTAR") !== null &&
                    window.localStorage.getItem("PROFISSIOGRAMA_LISTAR") !== '' &&
                    window.localStorage.getItem("PROFISSIOGRAMA_LISTAR") == "true" ) {
                if ( window.localStorage.getItem("PROFISSIOGRAMA_REMOVER") !== undefined &&
                        window.localStorage.getItem("PROFISSIOGRAMA_REMOVER") !== null &&
                        window.localStorage.getItem("PROFISSIOGRAMA_REMOVER") !== '' &&
                        window.localStorage.getItem("PROFISSIOGRAMA_REMOVER") == "true" )
                    this.canRemove = true;
                else this.canRemove = false;
                if ( state.url.includes("editar") ) {
                    if ( window.localStorage.getItem("PROFISSIOGRAMA_ALTERAR") !== undefined &&
                            window.localStorage.getItem("PROFISSIOGRAMA_ALTERAR") !== null &&
                            window.localStorage.getItem("PROFISSIOGRAMA_ALTERAR") !== '' &&
                            window.localStorage.getItem("PROFISSIOGRAMA_ALTERAR") == "true" ){
                        return true;
                    }
                    else return false;
                }
                if ( state.url.includes("detalhe") ) {
                    if ( window.localStorage.getItem("PROFISSIOGRAMA_DETALHE") !== undefined &&
                            window.localStorage.getItem("PROFISSIOGRAMA_DETALHE") !== null &&
                            window.localStorage.getItem("PROFISSIOGRAMA_DETALHE") !== '' &&
                            window.localStorage.getItem("PROFISSIOGRAMA_DETALHE") == "true" )
                        return true;
                    else return false;
                }
                if ( state.url.includes("cadastrar") ) {
                    if ( window.localStorage.getItem("PROFISSIOGRAMA_ADICIONAR") !== undefined &&
                            window.localStorage.getItem("PROFISSIOGRAMA_ADICIONAR") !== null &&
                            window.localStorage.getItem("PROFISSIOGRAMA_ADICIONAR") !== '' && 
                            window.localStorage.getItem("PROFISSIOGRAMA_ADICIONAR") == "true" ) {
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
