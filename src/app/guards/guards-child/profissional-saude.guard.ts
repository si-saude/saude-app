import { Injectable, EventEmitter } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { ChildGuard } from './../../generics/child.guard';
import { AuthService } from './../../login/auth.service';

@Injectable()
export class ProfissionalSaudeGuard extends ChildGuard implements CanActivateChild {   
    
    canActivateChild(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot
    ): boolean | Observable<boolean> | Promise<boolean> {
        if ( state.url.includes("profissional-saude") ) {
            if ( window.localStorage.getItem("PROFISSIONAL-SAUDE_LISTAR") !== undefined &&
                    window.localStorage.getItem("PROFISSIONAL-SAUDE_LISTAR") !== null &&
                    window.localStorage.getItem("PROFISSIONAL-SAUDE_LISTAR") !== '' &&
                    window.localStorage.getItem("PROFISSIONAL-SAUDE_LISTAR") == "true" ) {
                if ( window.localStorage.getItem("PROFISSIONAL-SAUDE_REMOVER") !== undefined &&
                        window.localStorage.getItem("PROFISSIONAL-SAUDE_REMOVER") !== null &&
                        window.localStorage.getItem("PROFISSIONAL-SAUDE_REMOVER") !== '' &&
                        window.localStorage.getItem("PROFISSIONAL-SAUDE_REMOVER") == "true" )
                    this.canRemove = true;
                else this.canRemove = false;
                if ( state.url.includes("editar") ) {
                    if ( window.localStorage.getItem("PROFISSIONAL-SAUDE_ALTERAR") !== undefined &&
                            window.localStorage.getItem("PROFISSIONAL-SAUDE_ALTERAR") !== null &&
                            window.localStorage.getItem("PROFISSIONAL-SAUDE_ALTERAR") !== '' &&
                            window.localStorage.getItem("PROFISSIONAL-SAUDE_ALTERAR") == "true" ){
                        return true;
                    }
                    else return false;
                }
                if ( state.url.includes("detalhe") ) {
                    if ( window.localStorage.getItem("PROFISSIONAL-SAUDE_DETALHE") !== undefined &&
                            window.localStorage.getItem("PROFISSIONAL-SAUDE_DETALHE") !== null &&
                            window.localStorage.getItem("PROFISSIONAL-SAUDE_DETALHE") !== '' &&
                            window.localStorage.getItem("PROFISSIONAL-SAUDE_DETALHE") == "true" )
                        return true;
                    else return false;
                }
                if ( state.url.includes("cadastrar") ) {
                    if ( window.localStorage.getItem("PROFISSIONAL-SAUDE_ADICIONAR") !== undefined &&
                            window.localStorage.getItem("PROFISSIONAL-SAUDE_ADICIONAR") !== null &&
                            window.localStorage.getItem("PROFISSIONAL-SAUDE_ADICIONAR") !== '' && 
                            window.localStorage.getItem("PROFISSIONAL-SAUDE_ADICIONAR") == "true" ) {
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
