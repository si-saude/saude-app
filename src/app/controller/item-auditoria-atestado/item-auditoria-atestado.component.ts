import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as $ from 'jquery';

import { GenericListComponent } from './../../generics/generic.list.component';
import { ItemAuditoriaAtestado } from './../../model/item-auditoria-atestado';
import { ItemAuditoriaAtestadoFilter } from './item-auditoria-atestado.filter';
import { ItemAuditoriaAtestadoService } from './item-auditoria-atestado.service';
import { ItemAuditoriaAtestadoGuard } from './../../guards/guards-child/item-auditoria-atestado.guard';

@Component( {
    selector: 'app-item-auditoria-atestado',
    templateUrl: './item-auditoria-atestado.component.html',
    styleUrls: ['./item-auditoria-atestado.component.css', '../../../assets/css/list-component.css']
} )
export class ItemAuditoriaAtestadoComponent extends GenericListComponent<ItemAuditoriaAtestado, ItemAuditoriaAtestadoFilter, ItemAuditoriaAtestadoGuard> {
    flagChange: boolean = true;

    constructor( itemAuditoriaAtestadoService: ItemAuditoriaAtestadoService, itemAuditoriaAtestadoGuard: ItemAuditoriaAtestadoGuard, router: Router ) {
        super( itemAuditoriaAtestadoService, new ItemAuditoriaAtestadoFilter(), itemAuditoriaAtestadoGuard, router );
    }

    getDescricao( descricao ) {
        if ( descricao.length < 100 ) return descricao;
        else return ( descricao.substr( 0, 96 ) + "..." );
    }
}
