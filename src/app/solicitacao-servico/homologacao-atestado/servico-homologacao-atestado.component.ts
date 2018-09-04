import { Component, OnInit, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MaterializeAction } from "angular2-materialize";

import { Tarefa } from './../../model/tarefa';
import { SolicitacaoServicoService } from './../solicitacao-servico.service';
import { Atestado } from './../../model/atestado';
import { AtestadoBuilder } from './../../controller/atestado/atestado.builder';
import { TarefaBuilder } from './../../controller/tarefa/tarefa.builder';
import { HomologacaoAtestadoComponent } from './../../includes/homologacao-atestado/homologacao-atestado.component';
import { TextUtil } from './../../generics/utils/text.util';
import { GlobalVariable } from './../../../../src/app/global';
import { GenericAtestadoComponent } from './../../generics/generic.atestado.component';

@Component( {
    selector: 'app-servico-homologacao-atestado',
    templateUrl: './homologacao-atestado.html',
    styleUrls: ['./homologacao-atestado.css']
} )
export class ServicoHomologacaoAtestadoComponent extends GenericAtestadoComponent {
    constructor(router: Router, solicitacaoServicoService: SolicitacaoServicoService ) {
        super(router, solicitacaoServicoService);
    }

    ngOnInit() {
        if ( localStorage.getItem( "tarefa" ) == undefined ) {
            this.router.navigate( ["/solicitacao-servico/selecao-servico"] );
        } else {
            let tarefa = new TarefaBuilder().clone( JSON.parse( localStorage.getItem( "tarefa" ) ) );
            this.atestado.setTarefa( tarefa );
            this.atestado.setEmpregado( tarefa.getCliente() );
            this.homologacaoAtestado.configure( this.atestado );
            localStorage.removeItem( "tarefa" );
        }
    }
}