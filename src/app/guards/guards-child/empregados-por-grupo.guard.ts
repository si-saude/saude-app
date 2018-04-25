import { Injectable, EventEmitter } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { ChildGuard } from './../../generics/child.guard';
import { AuthService } from './../../login/auth.service';

@Injectable()
export class EmpregadosPorGrupoGuard implements CanActivate {
    
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean | Observable<boolean> | Promise<boolean> {
        if ( state.url.includes("empregados-por-grupo") ) {
            if ( window.localStorage.getItem("REPORT-EMPREGADOS-POR-GRUPO") !== undefined &&
                    window.localStorage.getItem("REPORT-EMPREGADOS-POR-GRUPO") !== null &&
                    window.localStorage.getItem("REPORT-EMPREGADOS-POR-GRUPO") !== '' &&
                    window.localStorage.getItem("REPORT-EMPREGADOS-POR-GRUPO") == "true" ) {
                return true;
            } else return false;
        }
        
        return true;
    }
}
