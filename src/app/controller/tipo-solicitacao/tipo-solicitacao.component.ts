import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { TipoSolicitacao } from './../../model/tipo-solicitacao';
import { TipoSolicitacaoService } from './tipo-solicitacao.service';
import { TipoSolicitacaoFilter } from './tipo-solicitacao.filter';
import { TipoSolicitacaoGuard } from './../../guards/guards-child/tipo-solicitacao.guard';
import { GenericListComponent } from './../../generics/generic.list.component';

@Component( {
    selector: 'app-tipo-solicitacao',
    templateUrl: './tipo-solicitacao.component.html',
    styleUrls: ['./tipo-solicitacao.component.css', '../../../assets/css/list-component.css']
} )
export class TipoSolicitacaoComponent extends GenericListComponent<TipoSolicitacao, TipoSolicitacaoFilter, TipoSolicitacaoGuard> {

    constructor( service: TipoSolicitacaoService, tipoSolicitacaoGuard: TipoSolicitacaoGuard, router: Router ) {
        super( service, new TipoSolicitacaoFilter(), tipoSolicitacaoGuard, router );
    }
    
}