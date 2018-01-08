    import { Injectable, EventEmitter } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { ChildGuard } from './../../generics/child.guard';
import { AuthService } from './../../login/auth.service';

@Injectable()
export class AuditoriaResultadoExameGuard extends ChildGuard implements CanActivateChild {
    
    canActivateChild(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot
    ): boolean | Observable<boolean> | Promise<boolean> {
        if ( state.url.includes("auditoria-resultado-exame") ) {
            if ( window.localStorage.getItem("AUDITORIA-RESULTADO-EXAME_LISTAR") !== undefined &&
                    window.localStorage.getItem("AUDITORIA-RESULTADO-EXAME_LISTAR") !== null &&
                    window.localStorage.getItem("AUDITORIA-RESULTADO-EXAME_LISTAR") !== '' &&
                    window.localStorage.getItem("AUDITORIA-RESULTADO-EXAME_LISTAR") == "true" ) {
                if ( window.localStorage.getItem("AUDITORIA-RESULTADO-EXAME_REMOVER") !== undefined &&
                        window.localStorage.getItem("AUDITORIA-RESULTADO-EXAME_REMOVER") !== null &&
                        window.localStorage.getItem("AUDITORIA-RESULTADO-EXAME_REMOVER") !== '' &&
                        window.localStorage.getItem("AUDITORIA-RESULTADO-EXAME_REMOVER") == "true" ) {
                    this.canRemove = true;
                } else this.canRemove = false;
                if ( state.url.includes("editar") ) {
                    if ( window.localStorage.getItem("AUDITORIA-RESULTADO-EXAME_ALTERAR") !== undefined &&
                            window.localStorage.getItem("AUDITORIA-RESULTADO-EXAME_ALTERAR") !== null &&
                            window.localStorage.getItem("AUDITORIA-RESULTADO-EXAME_ALTERAR") !== '' &&
                            window.localStorage.getItem("AUDITORIA-RESULTADO-EXAME_ALTERAR") == "true" )
                        return true;
                    else return false;
                }
                if ( state.url.includes("detalhe") ) {
                    if ( window.localStorage.getItem("AUDITORIA-RESULTADO-EXAME_DETALHE") !== undefined &&
                            window.localStorage.getItem("AUDITORIA-RESULTADO-EXAME_DETALHE") !== null &&
                            window.localStorage.getItem("AUDITORIA-RESULTADO-EXAME_DETALHE") !== '' &&
                            window.localStorage.getItem("AUDITORIA-RESULTADO-EXAME_DETALHE") == "true" )
                        return true;
                    else return false;
                }
                if ( state.url.includes("cadastrar") ) {
                    if ( window.localStorage.getItem("AUDITORIA-RESULTADO-EXAME_ADICIONAR") !== undefined &&
                            window.localStorage.getItem("AUDITORIA-RESULTADO-EXAME_ADICIONAR") !== null &&
                            window.localStorage.getItem("AUDITORIA-RESULTADO-EXAME_ADICIONAR") !== '' && 
                            window.localStorage.getItem("AUDITORIA-RESULTADO-EXAME_ADICIONAR") == "true" ) {
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
