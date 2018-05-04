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
    
    ngDoCheck() {
        if ( this.flagChange ) {
            setTimeout(() => {
                if ( this.array != undefined )
                    for ( let i=0; i < this.array.length; i++ ) {
                      $("#descricao"+i).append(this.shortenDescricao(this.array[i]["descricao"]));                    
                    }
            }, 500);
            this.flagChange = false;            
        }
    }
    
    shortenDescricao( descricao: string ) {
        if ( descricao.length < 100 ) return descricao;
        else return ( descricao.substr(0, 96) + "..." );
    }
    
    goToPage( index: number ) {
        super.goToPage(index);
        this.flagChange = true;
    }
    
    list() {
        super.list();
        this.flagChange = true;
    }

}
