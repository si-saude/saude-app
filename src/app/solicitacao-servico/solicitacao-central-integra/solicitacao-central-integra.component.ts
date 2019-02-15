import { Component, EventEmitter, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import * as $ from 'jquery';
import { MaterializeAction } from "angular2-materialize";
import { MyDatePickerModule } from 'mydatepicker';
import { IMyDpOptions } from 'mydatepicker';

import { SolicitacaoCentralIntegra } from './../../model/solicitacao-central-integra';
import { SolicitacaoCentralIntegraBuilder } from './../../controller/solicitacao-central-integra/solicitacao-central-integra.builder';
import { SolicitacaoServicoService } from './../solicitacao-servico.service';
import { TipoSolicitacao } from './../../model/tipo-solicitacao';
import { TipoSolicitacaoBuilder } from './../../controller/tipo-solicitacao/tipo-solicitacao.builder';
import { TarefaBuilder } from './../../controller/tarefa/tarefa.builder';
import { Tarefa } from './../../model/tarefa';

@Component( {
    selector: 'app-reports-solicitacao-central-integra',
    templateUrl: './solicitacao-central-integra.html',
    styleUrls: ['./solicitacao-central-integra.css']
} )
export class SolicitacaoCentralIntegraComponent {
    @ViewChild( 'anexo' ) inputElAnexo: ElementRef;
    globalActions;
    toastParams;
    tarefa: Tarefa;
    solicitacao: SolicitacaoCentralIntegra;
    prazo: any;
    tipoSolicitacoes: Array<TipoSolicitacao>;
    
    showConfirmSave: boolean;
    msgConfirmSave: string;
    goTo: string;
    myDatePickerOptions: IMyDpOptions;
    
    constructor( private route: ActivatedRoute, private router: Router,
            private solicitacaoServicoService: SolicitacaoServicoService) {
        this.globalActions = new EventEmitter<string | MaterializeAction>();
        this.toastParams = ['', 4000];
        this.solicitacao = new SolicitacaoCentralIntegraBuilder().initialize(this.solicitacao);
        this.tarefa = new TarefaBuilder().initialize(this.tarefa);
        this.tipoSolicitacoes = new TipoSolicitacaoBuilder().initializeList(new Array<TipoSolicitacao>());
        
        this.myDatePickerOptions = {
                dateFormat: 'dd/mm/yyyy'
            };
    }
    
    ngOnInit() {
        if ( localStorage.getItem("tarefa") == undefined ) {
            this.router.navigate(["/solicitacao-servico/selecao-servico"]);
        } else {
            this.tarefa = new TarefaBuilder().clone(JSON.parse(localStorage.getItem("tarefa")));
            this.tarefa.setId(0);
            localStorage.removeItem("tarefa");
        }
        
        this.getTipoSolicitacoes();
    }
    
    getTipoSolicitacoes() {
        this.solicitacaoServicoService.getTipoSolicitacoes()
            .then(res => {
                this.tipoSolicitacoes = new TipoSolicitacaoBuilder().cloneList(res.json());
            })
            .catch(error => {
                console.log("Erro ao buscar tipo de solicitações."+error);
            })
    }
    
    next() {
        this.solicitacao.setTarefa(this.tarefa);
        
        let i: number = 0;
        let total: number = 0;
        let anexo = undefined;
    
        if ( this.inputElAnexo.nativeElement.files.length > 0 ) {
            anexo = this.inputElAnexo.nativeElement.files[0];
            total++;
        }
    
        if ( total > 0 ) {
            let component = this;
            let solicitacao: SolicitacaoCentralIntegra = new SolicitacaoCentralIntegraBuilder().clone( component.solicitacao );
    
            if ( anexo != undefined ) {
                if ( anexo.name.split(".")[1] != "zip" ) {
                    this.toastParams = ["Favor inserir um arquivo do tipo 'zip'.", 6000];
                    this.globalActions.emit( 'toast' );
                    return;
                }
                    
                let readerAnexo = new FileReader();
    
                readerAnexo.onload = function() {
                    let arrayBuffer: ArrayBuffer = readerAnexo.result;
                    let array = new Uint8Array( arrayBuffer );
                    solicitacao.setAnexo( array );
                    component.callSave( ++i, total, solicitacao );
                }
    
                readerAnexo.readAsArrayBuffer( new Blob( [anexo] ) );
            }
        } else {
            this.salvar( new SolicitacaoCentralIntegraBuilder().clone( this.solicitacao ) );
        }
    }
    
    callSave( i: number, total: number, solicitacao: SolicitacaoCentralIntegra ) {
        if ( i == total ) {
            this.salvar( solicitacao );
        }
    }
    
    salvar ( solicitacao ) {
        this.solicitacaoServicoService.registrarSolicitacao( solicitacao )
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