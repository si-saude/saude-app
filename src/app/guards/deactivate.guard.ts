import { Observable } from 'rxjs/Rx';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate } from '@angular/router';
import { Injectable } from '@angular/core';
//
//@Injectable()
//export class DeactivateGuard implements CanDeactivate<IFormCanDeactivate> {
//                
//        canDeactivate(
//            component: IFormCanDeactivate,
//            route: ActivatedRouteSnapshot,
//            state: RouterStateSnapshot
//        ): Observable<boolean>|Promise<boolean>|boolean {
//
//            console.log('guarda de desativação');
//
//            if ( component.isPossibleDeactivate() ) {
//                return true;
//            } return confirm("Tem certeza que deseja sair dessa página? Suas alterações não serão salvas.");
//    }
//}