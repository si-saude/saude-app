import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ParteCorpoAtingida } from '../../model/parte-corpo-atingida';
import { ParteCorpoAtingidaService } from './parte-corpo-atingida.service';
import { ParteCorpoAtingidaFilter } from './parte-corpo-atingida.filter';
import { ParteCorpoAtingidaGuard } from './../../guards/guards-child/parte-corpo-atingida.guard';
import { GenericListComponent } from './../../generics/generic.list.component';

@Component( {
    selector: 'app-parte-corpo-atingida',
    templateUrl: './parte-corpo-atingida.component.html',
    styleUrls: ['./parte-corpo-atingida.component.css', '../../../assets/css/list-component.css']
} )
export class ParteCorpoAtingidaComponent extends GenericListComponent<ParteCorpoAtingida, ParteCorpoAtingidaFilter, ParteCorpoAtingidaGuard> {

    constructor( service: ParteCorpoAtingidaService, parteCorpoAtingidaGuard: ParteCorpoAtingidaGuard, router: Router ) {
        super( service, new ParteCorpoAtingidaFilter(), parteCorpoAtingidaGuard, router );
    }
    
    showShortText(texto: string) {
        if ( texto.length > 20 )
            return texto.substr(0, 17)+"...";
        else return texto;
    }
     
}