import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

export class ChildGuard {
    //eventemitter nao esta funcionando - esse jeito é tosco!
    canRemove: boolean;

    constructor( private router: Router ) {}

    activateChild(path: string, route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean {
        if ( state.url.includes( path ) ) {
            let pathUpperCase = path.toUpperCase();
            if ( window.localStorage.getItem( pathUpperCase + "_LISTAR" ) !== undefined &&
                window.localStorage.getItem( pathUpperCase + "_LISTAR" ) !== null &&
                window.localStorage.getItem( pathUpperCase + "_LISTAR" ) !== '' &&
                window.localStorage.getItem( pathUpperCase + "_LISTAR" ) == "true" ) {
                if ( window.localStorage.getItem( pathUpperCase + "_REMOVER" ) !== undefined &&
                    window.localStorage.getItem( pathUpperCase + "_REMOVER" ) !== null &&
                    window.localStorage.getItem( pathUpperCase + "_REMOVER" ) !== '' &&
                    window.localStorage.getItem( pathUpperCase + "_REMOVER" ) == "true" ) {
                    this.canRemove = true;
                } else this.canRemove = false;
                if ( state.url.includes( "editar" ) ) {
                    if ( window.localStorage.getItem( pathUpperCase + "_ALTERAR" ) !== undefined &&
                        window.localStorage.getItem( pathUpperCase + "_ALTERAR" ) !== null &&
                        window.localStorage.getItem( pathUpperCase + "_ALTERAR" ) !== '' &&
                        window.localStorage.getItem( pathUpperCase + "_ALTERAR" ) == "true" )
                        return true;
                    else {
                        this.router.navigate(["login"]);
                        return false;
                    }
                } else if ( state.url.includes( "detalhe" ) ) {
                    if ( window.localStorage.getItem( pathUpperCase + "_DETALHE" ) !== undefined &&
                        window.localStorage.getItem( pathUpperCase + "_DETALHE" ) !== null &&
                        window.localStorage.getItem( pathUpperCase + "_DETALHE" ) !== '' &&
                        window.localStorage.getItem( pathUpperCase + "_DETALHE" ) == "true" )
                        return true;
                    else {
                        this.router.navigate(["login"]);
                        return false;
                    }
                } else if ( state.url.includes( "cadastrar" ) ) {
                    if ( window.localStorage.getItem( pathUpperCase + "_ADICIONAR" ) !== undefined &&
                        window.localStorage.getItem( pathUpperCase + "_ADICIONAR" ) !== null &&
                        window.localStorage.getItem( pathUpperCase + "_ADICIONAR" ) !== '' &&
                        window.localStorage.getItem( pathUpperCase + "_ADICIONAR" ) == "true" ) {
                        return true;
                    } else {
                        this.router.navigate(["login"]);
                        return false;
                    }
                }
                return true;
            } else {
                this.router.navigate(["login"]);
                return false;
            }
        }

        return false;
    }
}