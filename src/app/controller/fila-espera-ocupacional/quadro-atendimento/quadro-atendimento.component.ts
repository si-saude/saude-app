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

@Component( {
    selector: 'app-quadro-atendimento',
    templateUrl: './quadro-atendimento.html',
    styleUrls: ['./quadro-atendimento.css']
} )
export class QuadroAtendimentoComponent {
    atendimento: Atendimento;
    atendimentos: Array<Atendimento>;
    empregados: Array<Empregado>;
    tarefas = [[]];
    dataTarefas: any;
    dataInicioTarefa = [[]];
    dataFimTarefa = [[]];
    localizacoes: Array<Localizacao>;
    globalActions;
    toastParams;
    myDatePickerOptions: IMyDpOptions;

    constructor( private route: ActivatedRoute,
        private filaEsperaOcupacionalService: FilaEsperaOcupacionalService) {
        this.globalActions = new EventEmitter<string | MaterializeAction>();
        this.toastParams = ['', 4000];
        this.atendimento = new AtendimentoBuilder().initialize( this.atendimento );
        this.atendimentos = new AtendimentoBuilder().initializeList( this.atendimentos );
        this.empregados = new EmpregadoBuilder().initializeList( this.empregados );
        this.localizacoes = new LocalizacaoBuilder().initializeList( this.localizacoes );
        this.myDatePickerOptions = { dateFormat: 'dd/mm/yyyy' };
        this.dataInicioTarefa = new Array<any>();
        this.dataFimTarefa = new Array<any>();
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
        if ( localizacaoId == 0 || this.dataTarefas == null ) {
            this.toastParams = ['Por favor, preencha todos os campos da busca', 4000];
            this.globalActions.emit( 'toast' );
            return;
        }
        
        let localizacao = this.localizacoes.find(l => l.getId() == localizacaoId);
        
        this.atendimento.getFilaEsperaOcupacional().setLocalizacao( localizacao );
        this.atendimento.getTarefa().setInicio( this.parseDatePickerToDate( this.dataTarefas ) );
        
        this.filaEsperaOcupacionalService.buscarQuadroAtendimento( this.atendimento )
            .then(res => {
                this.atendimentos = new AtendimentoBuilder().cloneList( res.json() );
                console.log(res.json());
                this.dataInicioTarefa = [[]];
                this.dataFimTarefa = [[]];
                this.tarefas = [[]];
                this.empregados = new EmpregadoBuilder().initializeList(new Array<Empregado>());
                
                this.atendimentos.forEach(a => {
                    if ( this.empregados.find(e =>
                        a.getFilaEsperaOcupacional().getEmpregado().getId() == e.getId() ) == undefined )
                        this.empregados.push( a.getFilaEsperaOcupacional().getEmpregado() );
                });
                
                this.empregados.forEach(e => {
                    let flagServico: boolean;
                    if ( this.tarefas[ e.getId() ] == undefined ) { 
                        this.tarefas[ e.getId() ] = new TarefaBuilder().initializeList(new Array<Tarefa>());
                        flagServico = true;
                    }
                    this.atendimentos.filter( a => a.getFilaEsperaOcupacional().getEmpregado().getId() == e.getId() )
                        .forEach( aT => {
                            if ( flagServico ) {
                                setTimeout(() => {
                                    $("."+e.getId()).append(" - " + aT.getTarefa().getServico().getNome());
                                }, 300);
                                flagServico = false;
                            }
                            
                            this.tarefas[ e.getId() ].push( aT.getTarefa() ) 
                            if ( aT.getTarefa().getInicio() != undefined ) {
                                if ( this.dataInicioTarefa[aT.getTarefa().getId()] == undefined ) {
                                    this.dataInicioTarefa[aT.getTarefa().getId()] = new Array<string>();
                                    this.dataInicioTarefa[aT.getTarefa().getId()].push(
                                            this.treatString(aT.getTarefa().getInicio().toString()));
                                }
                            } else this.dataInicioTarefa[aT.getTarefa().getId()].push("");
                            if ( aT.getTarefa().getFim() != undefined ) {
                                if ( this.dataFimTarefa[aT.getTarefa().getId()] == undefined ) {
                                    this.dataFimTarefa[aT.getTarefa().getId()] = new Array<any>();
                                    this.dataFimTarefa[aT.getTarefa().getId()].push(
                                            this.treatString(aT.getTarefa().getFim().toString()));
                                }
                            } else this.dataFimTarefa[aT.getTarefa().getId()].push("");
                        });
                });
                this.tarefas.splice(0, 1);
            })
            .catch(error => {
                console.log("Erro ao retornar os atendimentos."+error);
            })
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
    
    parseDataToObjectDatePicker( data ) {
        if ( data === undefined || data === null ) {
            return undefined;
        }
        let s = data.split( "T" );
        let datas = s[0].split( "-" );
        if ( datas[2].substring( 0, 1 ) === "0" ) {
            datas[2] = datas[2].replace( "0", "" );
        }
        if ( datas[1].substring( 0, 1 ) === "0" ) {
            datas[1] = datas[1].replace( "0", "" );
        }
        let o = Object.create( { date: { year: datas[0], month: datas[1], day: datas[2] } } );
        return o;
    }
    
    treatString(date: string) {
        let s = date.split("T");
        s = s[1].split(".");
        return s[0];
    }
    
}