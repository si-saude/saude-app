import { Injectable, EventEmitter } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { ChildGuard } from './../../generics/child.guard';
import { AuthService } from './../../login/auth.service';

@Injectable()
export class LocalizacaoGuard extends ChildGuard implements CanActivateChild {   
    
    canActivateChild(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot
    ): boolean | Observable<boolean> | Promise<boolean> {
        if ( state.url.includes("localizacao") ) {
            if ( window.localStorage.getItem("LOCALIZACAO_LISTAR") !== undefined &&
                    window.localStorage.getItem("LOCALIZACAO_LISTAR") !== null &&
                    window.localStorage.getItem("LOCALIZACAO_LISTAR") !== '' &&
                    window.localStorage.getItem("LOCALIZACAO_LISTAR") == "true" ) {
                if ( window.localStorage.getItem("LOCALIZACAO_REMOVER") !== undefined &&
                        window.localStorage.getItem("LOCALIZACAO_REMOVER") !== null &&
                        window.localStorage.getItem("LOCALIZACAO_REMOVER") !== '' &&
                        window.localStorage.getItem("LOCALIZACAO_REMOVER") == "true" )
                    this.canRemove = true;
                else this.canRemove = false;
                if ( state.url.includes("editar") ) {
                    if ( window.localStorage.getItem("LOCALIZACAO_ALTERAR") !== undefined &&
                            window.localStorage.getItem("LOCALIZACAO_ALTERAR") !== null &&
                            window.localStorage.getItem("LOCALIZACAO_ALTERAR") !== '' &&
                            window.localStorage.getItem("LOCALIZACAO_ALTERAR") == "true" ){
                        return true;
                    }
                    else return false;
                }
                if ( state.url.includes("detalhe") ) {
                    if ( window.localStorage.getItem("LOCALIZACAO_DETALHE") !== undefined &&
                            window.localStorage.getItem("LOCALIZACAO_DETALHE") !== null &&
                            window.localStorage.getItem("LOCALIZACAO_DETALHE") !== '' &&
                            window.localStorage.getItem("LOCALIZACAO_DETALHE") == "true" )
                        return true;
                    else return false;
                }
                if ( state.url.includes("cadastrar") ) {
                    if ( window.localStorage.getItem("LOCALIZACAO_ADICIONAR") !== undefined &&
                            window.localStorage.getItem("LOCALIZACAO_ADICIONAR") !== null &&
                            window.localStorage.getItem("LOCALIZACAO_ADICIONAR") !== '' && 
                            window.localStorage.getItem("LOCALIZACAO_ADICIONAR") == "true" ) {
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
