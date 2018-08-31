import { Component, OnInit, EventEmitter, Output, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MaterializeAction } from "angular2-materialize";
import { MyDatePickerModule } from 'mydatepicker';
import { IMyDpOptions } from 'mydatepicker';
import * as $ from 'jquery';

import { GlobalVariable } from './../../../global';
import { Atendimento } from './../../../model/atendimento';
import { AtendimentoBuilder } from './../../atendimento/atendimento.builder';
import { Empregado } from './../../../model/empregado';
import { EmpregadoBuilder } from './../../empregado/empregado.builder';
import { Tarefa } from './../../../model/tarefa';
import { TarefaBuilder } from './../../tarefa/tarefa.builder';
import { Localizacao } from './../../../model/localizacao';
import { LocalizacaoBuilder } from './../../localizacao/localizacao.builder';
import { FilaEsperaOcupacional } from './../../../model/fila-espera-ocupacional';
import { FilaEsperaOcupacionalService } from './../fila-espera-ocupacional.service';
import { FilaEsperaOcupacionalBuilder } from './../fila-espera-ocupacional.builder';
import { DateUtil } from './../../../generics/utils/date.util';

@Component( {
    selector: 'app-quadro-atendimento',
    templateUrl: './quadro-atendimento.html',
    styleUrls: ['./quadro-atendimento.css']
} )
export class QuadroAtendimentoComponent {
    atendimento: Atendimento;
    atendimentos: Array<Atendimento>;
    empregados: Array<Empregado>;
    localizacoes: Array<Localizacao>;
    globalActions;
    toastParams;
    dateUtil: DateUtil;
    empregadoTarefas: Array<EmpregadoTarefas>;
    protected params; 

    constructor( private route: ActivatedRoute,
        private filaEsperaOcupacionalService: FilaEsperaOcupacionalService) {
        this.globalActions = new EventEmitter<string | MaterializeAction>();
        this.toastParams = ['', 4000];
        this.atendimento = new AtendimentoBuilder().initialize( this.atendimento );
        this.atendimentos = new AtendimentoBuilder().initializeList( this.atendimentos );
        this.empregados = new EmpregadoBuilder().initializeList( this.empregados );
        this.localizacoes = new LocalizacaoBuilder().initializeList( this.localizacoes );
        this.dateUtil = new DateUtil();
        this.empregadoTarefas = new Array<EmpregadoTarefas>();
        this.params = GlobalVariable.PARAMS_DATE;
    }

    ngOnInit() {
        this.getLocalizacoes();
    }
    
    getLocalizacoes() {
        this.filaEsperaOcupacionalService.getLocalizacoes()
            .then( res => {
                this.localizacoes = new LocalizacaoBuilder().cloneList( res.json() );
            } )
            .catch( error => {
                console.log( error.text() );
            } )
    }
    
    search( localizacaoId ) {
        if ( localizacaoId == 0) {
            this.toastParams = ['Por favor, preencha todos os campos da busca', 4000];
            this.globalActions.emit( 'toast' );
            return;
        }
        
        let localizacao = this.localizacoes.find(l => l.getId() == localizacaoId);
        
//        console.log(this.atendimento.getTarefa().getInicio());
        
        this.atendimento.getFilaEsperaOcupacional().setLocalizacao( localizacao );
        
        this.filaEsperaOcupacionalService.buscarQuadroAtendimento(new AtendimentoBuilder().clone(this.atendimento))
            .then(res => {
                this.atendimentos = new AtendimentoBuilder().cloneList( res.json() );
                this.empregadoTarefas = new Array<EmpregadoTarefas>();
                
                this.atendimentos.forEach(a => {
                    let empregado = this.empregadoTarefas.find(eT => a.getFilaEsperaOcupacional().getEmpregado().getId() == eT.getIdEmpregado() );
                    
                    if ( empregado == undefined ) {
                        let eTarefas = new EmpregadoTarefas();
                        eTarefas.setIdEmpregado(a.getFilaEsperaOcupacional().getEmpregado().getId());
                        eTarefas.setNomeEmpregado(a.getFilaEsperaOcupacional().getEmpregado().getPessoa().getNome());
                        eTarefas.setServico(a.getTarefa().getServico().getNome());
                        eTarefas.setStatusFila(a.getFilaEsperaOcupacional().getStatus());
                        eTarefas.getTarefas().push(a.getTarefa());
                        this.empregadoTarefas.push(eTarefas);
                    } else if ( a.getFilaEsperaOcupacional().getEmpregado().getId() == empregado.getIdEmpregado() ) {
                        empregado.getTarefas().push(a.getTarefa());
                    }
                })
            })
            .catch(error => {
                console.log("Erro ao retornar os atendimentos."+error);
            })
    }
    
    treatString( date ) {
        date = JSON.stringify(date)
        let s = date.split("T");
        s = s[1].split(".");
        let hour: number = Number(s[0].substr(0, 2)) - 3;
        let ret = hour + s[0].substr(2, date.length);
        return ret;
    }
    
}

class EmpregadoTarefas {
    private idEmpregado: number;
    private nomeEmpregado: string;
    private statusFila: string;
    private servico: string;
    private tarefas: Array<Tarefa> = new Array<Tarefa>();

    getIdEmpregado() {
        return this.idEmpregado;
    }
    
    setIdEmpregado(idEmpregado: number) {
        this.idEmpregado = idEmpregado;
    }

    getServico() {
        return this.servico;
    }
    
    setServico(servico: string) {
        this.servico = servico;
    }
    
    getNomeEmpregado() {
        return this.nomeEmpregado;
    }
    
    setNomeEmpregado(nomeEmpregado: string) {
        this.nomeEmpregado = nomeEmpregado;
    }
    
    getStatusFila() {
        return this.statusFila;
    }
    
    setStatusFila(statusFila: string) {
        this.statusFila = statusFila;
    }
    
    getTarefas() {
        return this.tarefas;
    }
    
    setTarefas(tarefas: Array<Tarefa>) {
        this.tarefas = tarefas;
    }
}