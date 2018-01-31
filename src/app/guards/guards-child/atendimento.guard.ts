import { Injectable, EventEmitter } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { ChildGuard } from './../../generics/child.guard';
import { AuthService } from './../../login/auth.service';

@Injectable()
export class AtendimentoGuard implements CanActivateChild {
    
    canActivateChild(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean | Observable<boolean> | Promise<boolean> {
        if ( state.url.includes("atendimento") ) {
            if ( window.localStorage.getItem("ATENDIMENTO") !== undefined &&
                    window.localStorage.getItem("ATENDIMENTO") !== null &&
                    window.localStorage.getItem("ATENDIMENTO") !== '' &&
                    window.localStorage.getItem("ATENDIMENTO") == "true" ) {
                return true;
            } else return false;
        }
        
        return true;
    }
}
