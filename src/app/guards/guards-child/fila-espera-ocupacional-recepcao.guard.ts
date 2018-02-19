import { Injectable, EventEmitter } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { ChildGuard } from './../../generics/child.guard';
import { AuthService } from './../../login/auth.service';

@Injectable()
export class FilaEsperaOcupacionalRecepcaoGuard extends ChildGuard implements CanActivateChild {
    r: Router;
    constructor(router: Router) {
        super(router);
        this.r = router;
    }
    
    canActivateChild(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean | Observable<boolean> | Promise<boolean> {
        if ( state.url.includes("fila-espera-ocupacional-recepcao") ) {
            if ( window.localStorage.getItem( "FILA-ESPERA-OCUPACIONAL-RECEPCAO" ) !== undefined &&
                window.localStorage.getItem( "FILA-ESPERA-OCUPACIONAL-RECEPCAO" ) !== null &&
                window.localStorage.getItem( "FILA-ESPERA-OCUPACIONAL-RECEPCAO" ) !== '' &&
                window.localStorage.getItem( "FILA-ESPERA-OCUPACIONAL-RECEPCAO" ) == "true" )
                return true;
            else {
                this.r.navigate(["login"]);
                return false;
            }
        }
        
        return false;
    }
}
