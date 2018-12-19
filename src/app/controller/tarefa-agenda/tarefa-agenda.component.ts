import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { GenericListComponent } from './../../generics/generic.list.component';
import { OrderFilter } from './../../generics/order.filter';
import { Tarefa } from './../../model/tarefa';
import { Equipe } from './../../model/equipe';
import { Servico } from './../../model/servico';
import { EquipeFilter } from './../equipe/equipe.filter';
import { PessoaFilter } from './../pessoa/pessoa.filter';
import { EmpregadoFilter } from './../empregado/empregado.filter';
import { TarefaFilter } from './../tarefa/tarefa.filter';
import { TarefaService } from './../tarefa/tarefa.service';
import { TarefaAgendaGuard } from './../../guards/guards-child/tarefa-agenda.guard';
import { ServicoFilter } from './../servico/servico.filter';

@Component( {
    selector: 'app-tarefa-agenda',
    templateUrl: './tarefa-agenda.component.html',
    styleUrls: ['./tarefa-agenda.component.css', '../../../assets/css/list-component.css']
} )
export class TarefaAgendaComponent extends GenericListComponent<Tarefa, TarefaFilter, TarefaAgendaGuard> {

    equipes: Array<Equipe>;
    servicos: Array<Servico>;
    
    constructor(protected tarefaService: TarefaService, tarefaGuard: TarefaAgendaGuard, router: Router) {
              
        super(tarefaService,new TarefaFilter(), tarefaGuard, router);
        this.filter.setEquipe(new EquipeFilter());
        this.filter.setCliente(new EmpregadoFilter());
        this.filter.getCliente().setPessoa(new PessoaFilter());
        this.getEquipes();
        this.getServicos();
    }
    
    setFilter() {        
        this.initializerDateFilter(this.filter.getInicio());
        super.setFilter();        
    }
    
    getEquipes() {

        this.tarefaService.getEquipes()
            .then( res => {
                this.equipes = res.json();
            } )
            .catch( error => {
                console.log( error );
            } );
    }
    
    getServicos() {

        this.tarefaService.getServicoService().getServicosAtendimentoOcupacional()
            .then( res => {
                this.servicos = res.json();
            } )
            .catch( error => {
                console.log( error );
            } );
    }
    
    list() {
        this.filter.setStatus("ABERTA");
        this.filter.setOrder(new OrderFilter());
        this.filter.getOrder().setProperty("inicio");
        this.filter.getOrder().setDesc(true);
        
        if(this.filter.getServico() == undefined)
            this.filter.setServico(new ServicoFilter());
        
        this.filter.getServico().setGrupo("ATENDIMENTO OCUPACIONAL");
        
        this.tarefaService.list( this.filter )        
            .then( res => {
                this.canImport = true;
                this.showPreload = false;
                this.array = JSON.parse( JSON.stringify( res.json() ) ).list;
                this.paginas = this.getPaginas( res.json().total );
                this.paginator();
                if ( res.json().total === 0 ) {
                    this.verifyEmptyPaginas = true;
                } else {
                    this.verifyEmptyPaginas = false;
                }
            } )
            .catch( error => {
                this.showPreload = false;
                this.canImport = false;
                this.catchConfiguration( error );
            } )
    }

}

