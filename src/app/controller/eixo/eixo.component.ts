import { Component, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GlobalVariable } from './../../global';
import { Eixo } from './../../model/eixo';
import { EixoService } from './eixo.service';
import { EixoFilter } from './eixo.filter';
import { EquipeFilter } from './../equipe/equipe.filter';
import { EixoGuard } from './../../guards/guards-child/eixo.guard';
import { GenericListComponent } from './../../generics/generic.list.component';

@Component( {
    selector: 'app-eixo',
    templateUrl: './eixo.component.html',
    styleUrls: ['./eixo.component.css', '../../../assets/css/list-component.css']
} )
export class EixoComponent extends GenericListComponent<Eixo, EixoFilter, EixoGuard> {
    
    constructor( eixoService: EixoService, eixoGuard: EixoGuard, router: Router ) {
        super( eixoService, new EixoFilter(), eixoGuard, router );
    }
    
    ngOnInit() {
        this.filter.setEquipe(new EquipeFilter());
        
        super.ngOnInit();
    }
    
}