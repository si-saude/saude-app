import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { AuthService } from './../login/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
            private authService: AuthService,
            private router: Router ) { }
    
    canActivate(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot
    ): boolean | Observable<boolean> | Promise<boolean> {
        if ( window.localStorage.getItem("token") === undefined ||
                window.localStorage.getItem("token") === null ||
                window.localStorage.getItem("token") === '' ) {
            console.log("auth guard");
            this.router.navigate(['/login']);
            return false;
        }
        
        console.log("auth guard true");
        return true;
    }

}
