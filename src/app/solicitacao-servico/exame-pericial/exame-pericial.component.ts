import { Component, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MaterializeAction } from "angular2-materialize";
import { MyDatePickerModule } from 'mydatepicker';
import { IMyDpOptions } from 'mydatepicker';

import { Atendimento } from './../../model/atendimento';
import { AtendimentoBuilder } from './../../controller/atendimento/atendimento.builder';
import { SolicitacaoServicoService } from './../solicitacao-servico.service';
import { TarefaBuilder } from './../../controller/tarefa/tarefa.builder';
import { Tarefa } from './../../model/tarefa';
import { Equipe } from './../../model/equipe';
import { EquipeBuilder } from './../../controller/equipe/equipe.builder';
import { EquipeFilter } from './../../controller/equipe/equipe.filter';
import { DateUtil } from './../../generics/utils/date.util';
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
    myDatePickerOptions: IMyDpOptions;
    dateUtil: DateUtil;
    textUtil: TextUtil;
    equipes: Array<Equipe>;
    
    constructor( private route: ActivatedRoute, private router: Router,
            private solicitacaoServicoService: SolicitacaoServicoService) {
        this.atendimento = new AtendimentoBuilder().initialize(this.atendimento);
        this.tarefa = new TarefaBuilder().initialize(this.tarefa);
        this.myDatePickerOptions = {
                dateFormat: 'dd/mm/yyyy'
            };
        this.dateUtil = new DateUtil();
        this.textUtil = new TextUtil();
        this.equipes = new EquipeBuilder().initializeList(new Array<Equipe>());
    }

    ngOnInit() {
        if ( localStorage.getItem("tarefa") == undefined ) {
            this.router.navigate(["/solicitacao-servico/selecao-servico"]);
        } else {
            this.getEquipes();
            this.tarefa = new TarefaBuilder().clone(JSON.parse(localStorage.getItem("tarefa")));
            localStorage.removeItem("tarefa");
        }
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
        this.tarefa.setInicio(this.dateUtil.parseDatePickerToDate(this.dataInicio));
        
        this.atendimento.setTarefa(this.tarefa);
        
        this.solicitacaoServicoService.registrarExamePericial( this.atendimento )
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