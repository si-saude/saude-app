import { Injectable, EventEmitter } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { ChildGuard } from './../../generics/child.guard';
import { AuthService } from './../../login/auth.service';

@Injectable()
export class AtendimentoGuard extends ChildGuard implements CanActivateChild {
    r: Router;
    constructor(router: Router) {
        super(router);
        this.r = router;
    }
    
    canActivateChild(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean | Observable<boolean> | Promise<boolean> {
        if ( state.url.includes("atendimento") ) {
            if ( window.localStorage.getItem("ATENDIMENTO") !== undefined &&
                    window.localStorage.getItem("ATENDIMENTO") !== null &&
                    window.localStorage.getItem("ATENDIMENTO") !== '' &&
                    window.localStorage.getItem("ATENDIMENTO") == "true" ) {
                if ( state.url.includes( "gerenciar" ) ) {
                    if ( window.localStorage.getItem( "ATENDIMENTO_GERENCIAR" ) !== undefined &&
                        window.localStorage.getItem( "ATENDIMENTO_GERENCIAR" ) !== null &&
                        window.localStorage.getItem( "ATENDIMENTO_GERENCIAR" ) !== '' &&
                        window.localStorage.getItem( "ATENDIMENTO_GERENCIAR" ) == "true" )
                        return true;
                    else {
                        this.r.navigate(["login"]);
                        return false;
                    }
                }
                return true;
            } else {
                this.r.navigate(["login"]);
                return false;
            }
            
        }
        
        return false;
    }
}
