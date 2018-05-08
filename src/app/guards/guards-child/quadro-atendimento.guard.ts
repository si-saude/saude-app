import { Injectable, EventEmitter } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { ChildGuard } from './../../generics/child.guard';
import { AuthService } from './../../login/auth.service';

@Injectable()
export class QuadroAtendimentoGuard implements CanActivate {
    
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean | Observable<boolean> | Promise<boolean> {
        if ( state.url.includes("quadro-atendimento") ) {
            if ( window.localStorage.getItem("QUADRO-ATENDIMENTO") !== undefined &&
                    window.localStorage.getItem("QUADRO-ATENDIMENTO") !== null &&
                    window.localStorage.getItem("QUADRO-ATENDIMENTO") !== '' &&
                    window.localStorage.getItem("QUADRO-ATENDIMENTO") == "true" ) {
                return true;
            } else return false;
        }
        
        return true;
    }
}
