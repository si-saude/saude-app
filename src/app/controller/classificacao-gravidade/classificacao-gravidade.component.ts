import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ClassificacaoGravidade } from './../../model/classificacao-gravidade';
import { ClassificacaoGravidadeService } from './classificacao-gravidade.service';
import { ClassificacaoGravidadeFilter } from './classificacao-gravidade.filter';
import { ClassificacaoGravidadeGuard } from './../../guards/guards-child/classificacao-gravidade.guard';
import { GenericListComponent } from './../../generics/generic.list.component';

@Component( {
    selector: 'app-classificacao-gravidade',
    templateUrl: './classificacao-gravidade.component.html',
    styleUrls: ['./classificacao-gravidade.component.css', '../../../assets/css/list-component.css']
} )
export class ClassificacaoGravidadeComponent
    extends GenericListComponent<ClassificacaoGravidade, ClassificacaoGravidadeFilter, ClassificacaoGravidadeGuard> {

    constructor( service: ClassificacaoGravidadeService, classificacaoGravidadeGuard: ClassificacaoGravidadeGuard, router: Router ) {
        super( service, new ClassificacaoGravidadeFilter(), classificacaoGravidadeGuard, router );
    }

}