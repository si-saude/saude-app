import { Injectable, EventEmitter } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { ChildGuard } from './../../generics/child.guard';
import { AuthService } from './../../login/auth.service';

@Injectable()
export class CargoGuard extends ChildGuard implements CanActivateChild {   
    
    canActivateChild(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot
    ): boolean | Observable<boolean> | Promise<boolean> {
        if ( state.url.includes("cargo") ) {
            if ( window.localStorage.getItem("CARGO_LISTAR") !== undefined &&
                    window.localStorage.getItem("CARGO_LISTAR") !== null &&
                    window.localStorage.getItem("CARGO_LISTAR") !== '' &&
                    window.localStorage.getItem("CARGO_LISTAR") == "true" ) {
                if ( window.localStorage.getItem("CARGO_REMOVER") !== undefined &&
                        window.localStorage.getItem("CARGO_REMOVER") !== null &&
                        window.localStorage.getItem("CARGO_REMOVER") !== '' &&
                        window.localStorage.getItem("CARGO_REMOVER") == "true" )
                    this.canRemove = true;
                else this.canRemove = false;
                if ( state.url.includes("editar") ) {
                    if ( window.localStorage.getItem("CARGO_ALTERAR") !== undefined &&
                            window.localStorage.getItem("CARGO_ALTERAR") !== null &&
                            window.localStorage.getItem("CARGO_ALTERAR") !== '' &&
                            window.localStorage.getItem("CARGO_ALTERAR") == "true" ){
                        return true;
                    }
                    else return false;
                }
                if ( state.url.includes("detalhe") ) {
                    if ( window.localStorage.getItem("CARGO_DETALHE") !== undefined &&
                            window.localStorage.getItem("CARGO_DETALHE") !== null &&
                            window.localStorage.getItem("CARGO_DETALHE") !== '' &&
                            window.localStorage.getItem("CARGO_DETALHE") == "true" )
                        return true;
                    else return false;
                }
                if ( state.url.includes("cadastrar") ) {
                    if ( window.localStorage.getItem("CARGO_ADICIONAR") !== undefined &&
                            window.localStorage.getItem("CARGO_ADICIONAR") !== null &&
                            window.localStorage.getItem("CARGO_ADICIONAR") !== '' && 
                            window.localStorage.getItem("CARGO_ADICIONAR") == "true" ) {
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
