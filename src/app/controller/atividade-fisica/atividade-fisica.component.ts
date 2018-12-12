import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AtividadeFisica } from './../../model/atividade-fisica';
import { AtividadeFisicaService } from './atividade-fisica.service';
import { AtividadeFisicaFilter } from './atividade-fisica.filter';
import { AtividadeFisicaGuard } from './../../guards/guards-child/atividade-fisica.guard';
import { GenericListComponent } from './../../generics/generic.list.component';

@Component( {
    selector: 'app-atividade-fisica',
    templateUrl: './atividade-fisica.component.html',
    styleUrls: ['./atividade-fisica.component.css', '../../../assets/css/list-component.css']
} )
export class AtividadeFisicaComponent extends GenericListComponent<AtividadeFisica, AtividadeFisicaFilter, AtividadeFisicaGuard> {

    constructor( service: AtividadeFisicaService, atividadeFisicaGuard: AtividadeFisicaGuard, router: Router ) {
        super( service, new AtividadeFisicaFilter(), atividadeFisicaGuard, router );
    }
    
}