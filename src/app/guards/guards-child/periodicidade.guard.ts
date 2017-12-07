import { Injectable, EventEmitter } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { ChildGuard } from './../../generics/child.guard';
import { AuthService } from './../../login/auth.service';

@Injectable()
export class PeriodicidadeGuard extends ChildGuard implements CanActivateChild {   
    
    canActivateChild(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot
    ): boolean | Observable<boolean> | Promise<boolean> {
        if ( state.url.includes("periodicidade") ) {
            if ( window.localStorage.getItem("PERIODICIDADE_LISTAR") !== undefined &&
                    window.localStorage.getItem("PERIODICIDADE_LISTAR") !== null &&
                    window.localStorage.getItem("PERIODICIDADE_LISTAR") !== '' &&
                    window.localStorage.getItem("PERIODICIDADE_LISTAR") == "true" ) {
                if ( window.localStorage.getItem("PERIODICIDADE_REMOVER") !== undefined &&
                        window.localStorage.getItem("PERIODICIDADE_REMOVER") !== null &&
                        window.localStorage.getItem("PERIODICIDADE_REMOVER") !== '' &&
                        window.localStorage.getItem("PERIODICIDADE_REMOVER") == "true" )
                    this.canRemove = true;
                else this.canRemove = false;
                if ( state.url.includes("editar") ) {
                    if ( window.localStorage.getItem("PERIODICIDADE_ALTERAR") !== undefined &&
                            window.localStorage.getItem("PERIODICIDADE_ALTERAR") !== null &&
                            window.localStorage.getItem("PERIODICIDADE_ALTERAR") !== '' &&
                            window.localStorage.getItem("PERIODICIDADE_ALTERAR") == "true" ){
                        return true;
                    }
                    else return false;
                }
                if ( state.url.includes("detalhe") ) {
                    if ( window.localStorage.getItem("PERIODICIDADE_DETALHE") !== undefined &&
                            window.localStorage.getItem("PERIODICIDADE_DETALHE") !== null &&
                            window.localStorage.getItem("PERIODICIDADE_DETALHE") !== '' &&
                            window.localStorage.getItem("PERIODICIDADE_DETALHE") == "true" )
                        return true;
                    else return false;
                }
                if ( state.url.includes("cadastrar") ) {
                    if ( window.localStorage.getItem("PERIODICIDADE_ADICIONAR") !== undefined &&
                            window.localStorage.getItem("PERIODICIDADE_ADICIONAR") !== null &&
                            window.localStorage.getItem("PERIODICIDADE_ADICIONAR") !== '' && 
                            window.localStorage.getItem("PERIODICIDADE_ADICIONAR") == "true" ) {
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
