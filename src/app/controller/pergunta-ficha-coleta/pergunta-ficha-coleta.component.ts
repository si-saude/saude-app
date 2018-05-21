import { Component, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as $ from 'jquery';

import { GenericListComponent } from './../../generics/generic.list.component'; 
import { PerguntaFichaColeta } from './../../model/pergunta-ficha-coleta';
import { PerguntaFichaColetaFilter } from './pergunta-ficha-coleta.filter';
import { PerguntaFichaColetaService } from './pergunta-ficha-coleta.service';
import { PerguntaFichaColetaGuard } from './../../guards/guards-child/pergunta-ficha-coleta.guard';

@Component({
  selector: 'app-pergunta-ficha-coleta',
  templateUrl: './pergunta-ficha-coleta.component.html',
  styleUrls: ['./pergunta-ficha-coleta.component.css', '../../../assets/css/list-component.css']
})
export class PerguntaFichaColetaComponent 
    extends GenericListComponent<PerguntaFichaColeta, PerguntaFichaColetaFilter, PerguntaFichaColetaGuard>{
    flagChange: boolean = true;

    constructor( perguntaFichaColetaService: PerguntaFichaColetaService, 
            perguntaFichaColetaGuard: PerguntaFichaColetaGuard, router: Router) {
        super(perguntaFichaColetaService, new PerguntaFichaColetaFilter(), perguntaFichaColetaGuard, router);
    }
    
    getDescricao( descricao ) {
      if ( descricao.length < 100 ) return descricao;
      else return ( descricao.substr(0, 96) + "..." );
    }
    
}