import { Injectable, EventEmitter } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { ChildGuard } from '../generics/child.guard';
import { AuthService } from '../login/auth.service';

@Injectable()
export class AgendaPeriodicoGuard implements CanActivate {

    constructor(
            private authService: AuthService,
            private router: Router ) { }
    
    canActivate(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot
    ): boolean | Observable<boolean> | Promise<boolean> {
        if ( window.localStorage.getItem("AGENDA-PERIODICO") === undefined ||
                window.localStorage.getItem("AGENDA-PERIODICO") === null ||
                window.localStorage.getItem("AGENDA-PERIODICO") === '' ) {
            this.router.navigate(['/login']);
            return false;
        }
        
        return true;
    }
}
