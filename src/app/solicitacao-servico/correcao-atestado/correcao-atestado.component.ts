import { Component, OnInit, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { MaterializeAction } from "angular2-materialize";

import { Tarefa } from './../../model/tarefa';
import { SolicitacaoServicoService } from './../solicitacao-servico.service';
import { Atestado } from './../../model/atestado';
import { AtestadoBuilder } from './../../controller/atestado/atestado.builder';
import { TarefaBuilder } from './../../controller/tarefa/tarefa.builder';
import { HomologacaoAtestadoComponent } from './../../includes/homologacao-atestado/homologacao-atestado.component';
import { TextUtil } from './../../generics/utils/text.util';
import { GlobalVariable } from './../../../../src/app/global';
import { AtestadoIdAutocomplete } from './../../controller/atestado/atestado-id.autocomplete';
import { GenericAtestadoComponent } from './../../generics/generic.atestado.component';

@Component( {
    selector: 'app-correcao-atestado',
    templateUrl: './correcao-atestado.html',
    styleUrls: ['./correcao-atestado.css']
} )
export class CorrecaoAtestadoComponent extends GenericAtestadoComponent {
    private containerAtestado: ContainerAtestado;
    private atestadoIdAutocomplete: AtestadoIdAutocomplete;
    private tarefa: Tarefa;

    constructor(router: Router, solicitacaoServicoService: SolicitacaoServicoService ) {
        super(router, solicitacaoServicoService);
        this.containerAtestado = new ContainerAtestado(new AtestadoBuilder().initialize(new Atestado()));
        this.atestadoIdAutocomplete = new AtestadoIdAutocomplete( this.solicitacaoServicoService.getAtestadoService() );
        this.tarefa = new TarefaBuilder().initialize(new Tarefa());
    }

    ngOnInit() {
        if ( localStorage.getItem( "tarefa" ) == undefined ) {
            this.router.navigate( ["/solicitacao-servico/selecao-servico"] );
        } else {
            this.tarefa = new TarefaBuilder().clone( JSON.parse( localStorage.getItem( "tarefa" ) ) );
            this.homologacaoAtestado.configure(this.containerAtestado.getAtestado());
            localStorage.removeItem( "tarefa" );
        }
    }
    
    verifyAtestado() {
        if ( this.containerAtestado.getAtestado().getVersion() >= 0 ) {
            return {'display': 'inline'};
        }
        return {'display': 'none'};
    }
    
    setAtestado() {
        if ( this.containerAtestado.getAtestado().getVersion() >= 0 ) {
            this.containerAtestado.getAtestado().setCiente(false);
        }
    }
}

class ContainerAtestado {
    private atestado: Atestado;

    constructor(atestado: Atestado) {
        this.atestado = atestado;
    }
    
    getId() {
        if(this.atestado)
            return this.atestado.getId();
        return undefined;
    }

    getAtestado() {
        return this.atestado;
    }
    
    setAtestado(atestado: Atestado) {
        this.atestado = atestado;
    }
}