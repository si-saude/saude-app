import { Injectable, EventEmitter } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { ChildGuard } from './../../generics/child.guard';
import { AuthService } from './../../login/auth.service';

@Injectable()
export class DeclaracaoComparecimentoGuard implements CanActivateChild {
    
    canActivateChild(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean | Observable<boolean> | Promise<boolean> {
        if ( state.url.includes("declaracao-comparecimento") ) {
            if ( window.localStorage.getItem("DECLARACAO-COMPARECIMENTO") !== undefined &&
                    window.localStorage.getItem("DECLARACAO-COMPARECIMENTO") !== null &&
                    window.localStorage.getItem("DECLARACAO-COMPARECIMENTO") !== '' &&
                    window.localStorage.getItem("DECLARACAO-COMPARECIMENTO") == "true" ) {
                return true;
            } else return false;
        }
        
        return true;
    }
}
