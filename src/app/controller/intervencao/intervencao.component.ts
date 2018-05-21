import { Component, OnInit } from '@angular/core'; 
import { Router } from '@angular/router';

import * as $ from 'jquery';

import { GenericListComponent } from './../../generics/generic.list.component'; 
import { Intervencao } from './../../model/intervencao';
import { IntervencaoFilter } from './intervencao.filter';
import { IntervencaoService } from './intervencao.service';
import { IntervencaoGuard } from './../../guards/guards-child/intervencao.guard';

@Component({
  selector: 'app-intervencao',
  templateUrl: './intervencao.component.html',
  styleUrls: ['./intervencao.component.css', '../../../assets/css/list-component.css']
})
export class IntervencaoComponent extends GenericListComponent<Intervencao, IntervencaoFilter, IntervencaoGuard> {
    flagChange: boolean = true;
    
    constructor(intervencaoService: IntervencaoService, intervencaoGuard: IntervencaoGuard, router: Router) {
        super(intervencaoService, new IntervencaoFilter(), intervencaoGuard, router);
    }
    
    getDescricao( descricao ) {
      if ( descricao.length < 100 ) return descricao;
      else return ( descricao.substr(0, 96) + "..." );
    }
}
