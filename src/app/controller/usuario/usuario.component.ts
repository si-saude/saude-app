import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { Usuario } from './../../model/usuario';
import { UsuarioService } from './usuario.service';
import { UsuarioFilter } from './usuario.filter';
import { GenericListComponent } from './../../generics/generic.list.component';
import { UsuarioGuard } from './../../guards/guards-child/usuario.guard';
import { CheckboxUtil } from './../../generics/utils/checkbox.util'; 

@Component( {
    selector: 'app-usuario',
    templateUrl: './usuario.component.html',
    styleUrls: ['./usuario.component.css', '../../../assets/css/list-component.css']
} )
export class UsuarioComponent extends GenericListComponent<Usuario, UsuarioFilter, UsuarioGuard> {
    private gestorCss: CheckboxUtil;
    
    constructor( service: UsuarioService, usuarioGuard: UsuarioGuard, router: Router ) {
        super( service, new UsuarioFilter(), usuarioGuard, router );
    }

    ngAfterViewInit() {
        this.gestorCss = new CheckboxUtil(document.getElementById("gestorCss") as HTMLInputElement);
    }
    
    filtrar() {
        this.filter.getGestorCss().setValue(this.gestorCss.getValue());
        
        this.setFilter();
    }

}