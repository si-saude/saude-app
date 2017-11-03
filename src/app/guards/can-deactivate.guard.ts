import { Observable } from 'rxjs/Rx';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate } from '@angular/router';
import { Injectable } from '@angular/core';

import { GenericFormComponent } from './../generics/generic.form.component';

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<GenericFormComponent> {
                
        canDeactivate(
            component: GenericFormComponent,
            route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot
        ): Observable<boolean>|Promise<boolean>|boolean {
            if ( component.isPossibleDeactivate() ) {
                return true;
            } else {
                component.openModalDeactivate();
                
            }
    }
}