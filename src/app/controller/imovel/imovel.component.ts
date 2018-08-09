import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Imovel } from './../../model/imovel';
import { ImovelService } from './imovel.service';
import { ImovelFilter } from './imovel.filter';
import { ImovelGuard } from './../../guards/guards-child/imovel.guard';
import { GenericListComponent } from './../../generics/generic.list.component';

@Component( {
    selector: 'app-imovel',
    templateUrl: './imovel.component.html',
    styleUrls: ['./imovel.component.css', '../../../assets/css/list-component.css']
} )
export class ImovelComponent extends GenericListComponent<Imovel, ImovelFilter, ImovelGuard> {

    constructor( service: ImovelService, imovelGuard: ImovelGuard, router: Router ) {
        super( service, new ImovelFilter(), imovelGuard, router );
    }
    
}