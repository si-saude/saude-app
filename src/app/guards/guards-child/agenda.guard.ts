import { Injectable, EventEmitter } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { ChildGuard } from './../../generics/child.guard';
import { AuthService } from './../../login/auth.service';

@Injectable()
export class AgendaGuard implements CanActivateChild {
    
    canActivateChild(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean | Observable<boolean> | Promise<boolean> {
        if ( state.url.includes("agenda") ) {
            if ( window.localStorage.getItem("AGENDA") !== undefined &&
                    window.localStorage.getItem("AGENDA") !== null &&
                    window.localStorage.getItem("AGENDA") !== '' &&
                    window.localStorage.getItem("AGENDA") == "true" ) {
                return true;
            } else return false;
        }
        
        return true;
    }
}
