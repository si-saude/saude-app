import { Injectable, EventEmitter } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { ChildGuard } from '../generics/child.guard';
import { AuthService } from '../login/auth.service';

@Injectable()
export class PanoramaGuard implements CanActivate {

    constructor(
            private authService: AuthService,
            private router: Router ) { }
    
    canActivate(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot
    ): boolean | Observable<boolean> | Promise<boolean> {
        if ( window.localStorage.getItem("REPORT-PANORAMA") === undefined ||
                window.localStorage.getItem("REPORT-PANORAMA") === null ||
                window.localStorage.getItem("REPORT-PANORAMA") === '' ) {
            this.router.navigate(['/login']);
            return false;
        }
        
        return true;
    }
}
