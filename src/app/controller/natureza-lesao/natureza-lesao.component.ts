import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { NaturezaLesao } from './../../model/natureza-lesao';
import { NaturezaLesaoService } from './natureza-lesao.service';
import { NaturezaLesaoFilter } from './natureza-lesao.filter';
import { NaturezaLesaoGuard } from './../../guards/guards-child/natureza-lesao.guard';
import { GenericListComponent } from './../../generics/generic.list.component';

@Component( {
    selector: 'app-natureza-lesao',
    templateUrl: './natureza-lesao.component.html',
    styleUrls: ['./natureza-lesao.component.css', '../../../assets/css/list-component.css']
} )
export class NaturezaLesaoComponent extends GenericListComponent<NaturezaLesao, NaturezaLesaoFilter, NaturezaLesaoGuard> {

    constructor( service: NaturezaLesaoService, naturezaLesaoGuard: NaturezaLesaoGuard, router: Router ) {
        super( service, new NaturezaLesaoFilter(), naturezaLesaoGuard, router );
    }
    
    showShortText(texto: string) {
        if ( texto.length > 20 )
            return texto.substr(0, 17)+"...";
        else return texto;
    }
     
}