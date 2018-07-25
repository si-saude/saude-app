import { Component, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MaterializeDirective, MaterializeAction } from "angular2-materialize";
import 'rxjs/add/operator/toPromise';

import { GlobalVariable } from './../../global';
import { Atendimento } from './../../model/atendimento';
import { AtendimentoFilter } from './../atendimento/atendimento.filter';
import { AtendimentoService } from './../atendimento/atendimento.service';
import { AtendimentoAvulsoGuard } from './../../guards/guards-child/atendimento-avulso.guard';
import { GenericListComponent } from './../../generics/generic.list.component';

@Component( {
    selector: 'app-atendimento-avulso',
    templateUrl: './atendimento-avulso.component.html',
    styleUrls: ['./atendimento-avulso.component.css', '../../../assets/css/list-component.css']
} )
export class AtendimentoAvulsoComponent extends GenericListComponent<Atendimento, AtendimentoFilter, AtendimentoAvulsoGuard> {
    filtro: AtendimentoFilter;

    constructor(atendimentoService: AtendimentoService,atendimentoAvulsoGuard: AtendimentoAvulsoGuard, router: Router ) {
        super(atendimentoService, new AtendimentoFilter(),atendimentoAvulsoGuard, router );
     }

    

    
}