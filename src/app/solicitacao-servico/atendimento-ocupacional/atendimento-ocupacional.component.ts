import { Component, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MaterializeAction } from "angular2-materialize";
import { MyDatePickerModule } from 'mydatepicker';

import { Atendimento } from './../../model/atendimento';
import { AtendimentoBuilder } from './../../controller/atendimento/atendimento.builder';
import { SolicitacaoServicoService } from './../solicitacao-servico.service';
import { TarefaBuilder } from './../../controller/tarefa/tarefa.builder';
import { Tarefa } from './../../model/tarefa';

@Component( {
    selector: 'app-atendimento-ocupacional',
    templateUrl: './atendimento-ocupacional.html',
    styleUrls: ['./atendimento-ocupacional.css']
} )
export class AtendimentoOcupacionalComponent {
    globalActions;
    toastParams;
    tarefa: Tarefa;
    atendimento: Atendimento;
    dataInicio: any;
    showConfirmSave: boolean;
    msgConfirmSave: string;
    goTo: string;
    
    constructor( private route: ActivatedRoute, private router: Router,
            private solicitacaoServicoService: SolicitacaoServicoService) {
        this.globalActions = new EventEmitter<string | MaterializeAction>();
        this.toastParams = ['', 4000];
        this.atendimento = new AtendimentoBuilder().initialize(this.atendimento);
        this.tarefa = new TarefaBuilder().initialize(this.tarefa);
    }

    ngOnInit() {
        
        if ( localStorage.getItem("tarefa") == undefined ) {
            this.router.navigate(["/solicitacao-servico/selecao-servico"]);
        } else {
            this.tarefa = new TarefaBuilder().clone(JSON.parse(localStorage.getItem("tarefa")));
            localStorage.removeItem("tarefa");
        }
        
    }

    next() {
        this.tarefa.setInicio(this.parseDatePickerToDate(this.dataInicio));
        
        this.atendimento.setTarefa(this.tarefa);
        
        this.solicitacaoServicoService.registrarAtendimento( this.atendimento )
            .then(res => {
                this.showConfirmSave = true;
                this.msgConfirmSave = res.text();
                this.goTo = "home";
            })
            .catch(error => {
                this.showConfirmSave = true;
                this.msgConfirmSave = error.text();
                this.goTo = "home";
            })
    }
    
    back() {
        this.router.navigate(["/solicitacao-servico/selecao-servico"]);
    }
    
    parseDatePickerToDate( data ) {
        if ( data === undefined || data === null ) {
            return null;
        } else if ( data instanceof Date ) {
            return data;
        }
        let d: Date = new Date( data.date.year, data.date.month - 1, data.date.day );
        return d;
    }
}