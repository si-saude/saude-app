import { Component, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MaterializeDirective, MaterializeAction } from "angular2-materialize";
import 'rxjs/add/operator/toPromise';

import { GlobalVariable } from './../../global';
import { Curso } from './../../model/curso';
import { CursoService } from './curso.service';
import { CursoFilter } from './curso.filter';
import { CursoGuard } from './../../guards/guards-child/curso.guard';
import { GenericListComponent } from './../../generics/generic.list.component';

@Component( {
    selector: 'app-curso',
    templateUrl: './curso.component.html',
    styleUrls: ['./curso.component.css', '../../../assets/css/list-component.css']
} )
export class CursoComponent extends GenericListComponent<Curso, CursoFilter, CursoGuard> {
    filtro: CursoFilter;

    constructor( cursoService: CursoService, cursoGuard: CursoGuard, router: Router ) {
        super( cursoService, new CursoFilter(), cursoGuard, router );
        
        this.filtro = new CursoFilter();
    }
    
    filtrar() {
        if ( this.filtro.getValidade() == null )
            this.filtro.setValidade(undefined)
        this.filter = this.filtro;
        
        this.setFilter();
    }

}