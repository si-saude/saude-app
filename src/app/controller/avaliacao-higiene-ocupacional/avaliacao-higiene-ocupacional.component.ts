import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AvaliacaoHigieneOcupacional } from './../../model/avaliacao-higiene-ocupacional';
import { AvaliacaoHigieneOcupacionalService } from './avaliacao-higiene-ocupacional.service';
import { AvaliacaoHigieneOcupacionalFilter } from './avaliacao-higiene-ocupacional.filter';
import { AvaliacaoHigieneOcupacionalGuard } from '../../guards/guards-child/avaliacao-higiene-ocupacional.guard';
import { GenericListComponent } from '../../generics/generic.list.component';

@Component( {
    selector: 'app-avaliacao-higiene-ocupacional',
    templateUrl: './avaliacao-higiene-ocupacional.component.html',
    styleUrls: ['./avaliacao-higiene-ocupacional.component.css', '../../../assets/css/list-component.css']
} )
export class AvaliacaoHigieneOcupacionalComponent extends GenericListComponent<AvaliacaoHigieneOcupacional, AvaliacaoHigieneOcupacionalFilter, AvaliacaoHigieneOcupacionalGuard> {

    constructor( service: AvaliacaoHigieneOcupacionalService, avaliacaoHigieneOcupacionalGuard: AvaliacaoHigieneOcupacionalGuard, router: Router ) {
        super( service, new AvaliacaoHigieneOcupacionalFilter(), avaliacaoHigieneOcupacionalGuard, router );
    }
    
}