import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AcaoIntervencao } from '../../model/acao-intervencao';
import { AcaoIntervencaoService } from '../acao-intervencao/acao-intervencao.service';
import { AcaoIntervencaoFilter } from '../acao-intervencao/acao-intervencao.filter';
import { AcaoIntervencaoGuard } from '../../guards/guards-child/acao-intervencao.guard';
import { GenericListComponent } from '../../generics/generic.list.component';

@Component( {
    selector: 'app-acao-intervencao',
    templateUrl: './acao-intervencao.component.html',
    styleUrls: ['./acao-intervencao.component.css', '../../../assets/css/list-component.css']
} )
export class AcaoIntervencaoComponent extends GenericListComponent<AcaoIntervencao, AcaoIntervencaoFilter, AcaoIntervencaoGuard> {

    constructor( service: AcaoIntervencaoService, acaoIntervencaoGuard: AcaoIntervencaoGuard, router: Router ) {
        super( service, new AcaoIntervencaoFilter(), acaoIntervencaoGuard, router );
    }
    
}