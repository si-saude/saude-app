import { Component, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MaterializeAction } from "angular2-materialize";

import { Atendimento } from './../../model/atendimento';
import { AtendimentoBuilder } from './../../controller/atendimento/atendimento.builder';
import { SolicitacaoServicoService } from './../solicitacao-servico.service';
import { TarefaBuilder } from './../../controller/tarefa/tarefa.builder';
import { Tarefa } from './../../model/tarefa';
import { Equipe } from './../../model/equipe';
import { EquipeBuilder } from './../../controller/equipe/equipe.builder';
import { EquipeFilter } from './../../controller/equipe/equipe.filter';
import { TextUtil } from './../../generics/utils/text.util';

@Component( {
    selector: 'app-exame-pericial',
    templateUrl: './exame-pericial.html',
    styleUrls: ['./exame-pericial.css']
} )
export class ExamePericialComponent {
    tarefa: Tarefa;
    atendimento: Atendimento;
    dataInicio: any;
    showConfirmSave: boolean;
    msgConfirmSave: string;
    goTo: string;
    textUtil: TextUtil;
    equipes: Array<Equipe>;
    
    constructor( private route: ActivatedRoute, private router: Router,
            private solicitacaoServicoService: SolicitacaoServicoService) {
        this.atendimento = new AtendimentoBuilder().initialize(this.atendimento);
        this.equipes = new EquipeBuilder().initializeList(new Array<Equipe>());
        this.textUtil = new TextUtil();
    }

    ngOnInit() {
        if ( localStorage.getItem("tarefa") == undefined ) {
            this.router.navigate(["/solicitacao-servico/selecao-servico"]);
        } else {
            this.getEquipes();
            this.atendimento.setTarefa(new TarefaBuilder().clone(JSON.parse(localStorage.getItem("tarefa"))));
            localStorage.removeItem("tarefa");
        }
        this.getEquipes();
    }
    
    getEquipes() {
        this.solicitacaoServicoService.getEquipeMedicinaOdonto()
            .then(res => {
                this.equipes = new EquipeBuilder().cloneList(res.json().list);
            })
            .catch(error => {
                console.log("Erro ao buscar as equipes.");
            })
    }

    next() {
        this.solicitacaoServicoService.registrarExamePericial( new AtendimentoBuilder().clone(this.atendimento ))
            .then(res => {
                this.showConfirmSave = true;
                this.msgConfirmSave = res.text();
                this.goTo = "solicitacao-servico/autenticacao-usuario";
            })
            .catch(error => {
                this.showConfirmSave = true;
                this.msgConfirmSave = error.text();
                this.goTo = "solicitacao-servico/autenticacao-usuario";
            })
    }
    
    back() {
        this.router.navigate(["/solicitacao-servico/selecao-servico"]);
    }
    
}