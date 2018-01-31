import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { Usuario } from './../../model/usuario';
import { UsuarioService } from './usuario.service';
import { UsuarioFilter } from './usuario.filter';
import { GenericListComponent } from './../../generics/generic.list.component';
import { UsuarioGuard } from './../../guards/guards-child/usuario.guard';

@Component( {
    selector: 'app-usuario',
    templateUrl: './usuario.component.html',
    styleUrls: ['./usuario.component.css', '../../../assets/css/list-component.css']
} )
export class UsuarioComponent extends GenericListComponent<Usuario, UsuarioFilter, UsuarioGuard> {
    @ViewChild( "gCss" ) gCss: ElementRef;
    gestorCss: HTMLInputElement;
    flagGestorCss: number = 0;
    
    constructor( service: UsuarioService, usuarioGuard: UsuarioGuard, router: Router ) {
        super( service, new UsuarioFilter(), usuarioGuard, router );
    }

    ngAfterViewInit() {
        this.gestorCss = this.gCss.nativeElement;
    }

    changeStateGestorCss() {
        if ( this.gestorCss.checked == false ) {
            this.flagGestorCss++;
        }
        if ( this.flagGestorCss % 2 == 0 ) {
            this.gestorCss.indeterminate = true;
            this.gestorCss.checked = true;
            this.flagGestorCss = 0;
        }
    }

    filtrar() {
        if ( this.gestorCss.indeterminate == true )
            this.filter.getGestorCss().setValue( 0 );
        else if ( this.gestorCss.checked == true )
            this.filter.getGestorCss().setValue( 1 );
        else this.filter.getGestorCss().setValue( 2 );

        this.setFilter();
    }

}