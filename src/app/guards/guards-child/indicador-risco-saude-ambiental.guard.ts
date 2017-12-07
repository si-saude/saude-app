import { Injectable, EventEmitter } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { ChildGuard } from './../../generics/child.guard';
import { AuthService } from './../../login/auth.service';

@Injectable()
export class IndicadorRiscoSaudeAmbientalGuard extends ChildGuard implements CanActivateChild {   
    
    canActivateChild(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot
    ): boolean | Observable<boolean> | Promise<boolean> {
        if ( state.url.includes("indicador-risco-saude-ambiental") ) {
            if ( window.localStorage.getItem("INDICADOR-RISCO-SAUDE-AMBIENTAL_LISTAR") !== undefined &&
                    window.localStorage.getItem("INDICADOR-RISCO-SAUDE-AMBIENTAL_LISTAR") !== null &&
                    window.localStorage.getItem("INDICADOR-RISCO-SAUDE-AMBIENTAL_LISTAR") !== '' &&
                    window.localStorage.getItem("INDICADOR-RISCO-SAUDE-AMBIENTAL_LISTAR") == "true" ) {
                if ( window.localStorage.getItem("INDICADOR-RISCO-SAUDE-AMBIENTAL_REMOVER") !== undefined &&
                        window.localStorage.getItem("INDICADOR-RISCO-SAUDE-AMBIENTAL_REMOVER") !== null &&
                        window.localStorage.getItem("INDICADOR-RISCO-SAUDE-AMBIENTAL_REMOVER") !== '' &&
                        window.localStorage.getItem("INDICADOR-RISCO-SAUDE-AMBIENTAL_REMOVER") == "true" )
                    this.canRemove = true;
                else this.canRemove = false;
                if ( state.url.includes("editar") ) {
                    if ( window.localStorage.getItem("INDICADOR-RISCO-SAUDE-AMBIENTAL_ALTERAR") !== undefined &&
                            window.localStorage.getItem("INDICADOR-RISCO-SAUDE-AMBIENTAL_ALTERAR") !== null &&
                            window.localStorage.getItem("INDICADOR-RISCO-SAUDE-AMBIENTAL_ALTERAR") !== '' &&
                            window.localStorage.getItem("INDICADOR-RISCO-SAUDE-AMBIENTAL_ALTERAR") == "true" ){
                        return true;
                    }
                    else return false;
                }
                if ( state.url.includes("detalhe") ) {
                    if ( window.localStorage.getItem("INDICADOR-RISCO-SAUDE-AMBIENTAL_DETALHE") !== undefined &&
                            window.localStorage.getItem("INDICADOR-RISCO-SAUDE-AMBIENTAL_DETALHE") !== null &&
                            window.localStorage.getItem("INDICADOR-RISCO-SAUDE-AMBIENTAL_DETALHE") !== '' &&
                            window.localStorage.getItem("INDICADOR-RISCO-SAUDE-AMBIENTAL_DETALHE") == "true" )
                        return true;
                    else return false;
                }
                if ( state.url.includes("cadastrar") ) {
                    if ( window.localStorage.getItem("INDICADOR-RISCO-SAUDE-AMBIENTAL_ADICIONAR") !== undefined &&
                            window.localStorage.getItem("INDICADOR-RISCO-SAUDE-AMBIENTAL_ADICIONAR") !== null &&
                            window.localStorage.getItem("INDICADOR-RISCO-SAUDE-AMBIENTAL_ADICIONAR") !== '' && 
                            window.localStorage.getItem("INDICADOR-RISCO-SAUDE-AMBIENTAL_ADICIONAR") == "true" ) {
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
