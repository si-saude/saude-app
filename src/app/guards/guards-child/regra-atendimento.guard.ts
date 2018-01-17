import { Injectable, EventEmitter } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { ChildGuard } from './../../generics/child.guard';
import { AuthService } from './../../login/auth.service';

@Injectable()
export class RegraAtendimentoGuard extends ChildGuard implements CanActivateChild {   
    
    canActivateChild(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot
    ): boolean | Observable<boolean> | Promise<boolean> {
        if ( state.url.includes("regime") ) {
            if ( window.localStorage.getItem("REGRA-ATENDIMENTO_LISTAR") !== undefined &&
                    window.localStorage.getItem("REGRA-ATENDIMENTO_LISTAR") !== null &&
                    window.localStorage.getItem("REGRA-ATENDIMENTO_LISTAR") !== '' &&
                    window.localStorage.getItem("REGRA-ATENDIMENTO_LISTAR") == "true" ) {
                if ( window.localStorage.getItem("REGRA-ATENDIMENTO_REMOVER") !== undefined &&
                        window.localStorage.getItem("REGRA-ATENDIMENTO_REMOVER") !== null &&
                        window.localStorage.getItem("REGRA-ATENDIMENTO_REMOVER") !== '' &&
                        window.localStorage.getItem("REGRA-ATENDIMENTO_REMOVER") == "true" )
                    this.canRemove = true;
                else this.canRemove = false;
                if ( state.url.includes("editar") ) {
                    if ( window.localStorage.getItem("REGRA-ATENDIMENTO_ALTERAR") !== undefined &&
                            window.localStorage.getItem("REGRA-ATENDIMENTO_ALTERAR") !== null &&
                            window.localStorage.getItem("REGRA-ATENDIMENTO_ALTERAR") !== '' &&
                            window.localStorage.getItem("REGRA-ATENDIMENTO_ALTERAR") == "true" ){
                        return true;
                    }
                    else return false;
                }
                if ( state.url.includes("detalhe") ) {
                    if ( window.localStorage.getItem("REGRA-ATENDIMENTO_DETALHE") !== undefined &&
                            window.localStorage.getItem("REGRA-ATENDIMENTO_DETALHE") !== null &&
                            window.localStorage.getItem("REGRA-ATENDIMENTO_DETALHE") !== '' &&
                            window.localStorage.getItem("REGRA-ATENDIMENTO_DETALHE") == "true" )
                        return true;
                    else return false;
                }
                if ( state.url.includes("cadastrar") ) {
                    if ( window.localStorage.getItem("REGRA-ATENDIMENTO_ADICIONAR") !== undefined &&
                            window.localStorage.getItem("REGRA-ATENDIMENTO_ADICIONAR") !== null &&
                            window.localStorage.getItem("REGRA-ATENDIMENTO_ADICIONAR") !== '' && 
                            window.localStorage.getItem("REGRA-ATENDIMENTO_ADICIONAR") == "true" ) {
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
