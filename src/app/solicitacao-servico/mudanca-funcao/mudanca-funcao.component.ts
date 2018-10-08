import { Component, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterializeAction } from "angular2-materialize";

import { MudancaFuncao } from './../../model/mudanca-funcao';
import { MudancaFuncaoBuilder } from './../../controller/mudanca-funcao/mudanca-funcao.builder';
import { InstalacaoBuilder } from './../../controller/instalacao/instalacao.builder';
import { EmpregadoBuilder } from './../../controller/empregado/empregado.builder';
import { SolicitacaoServicoService } from './../solicitacao-servico.service';
import { TarefaBuilder } from './../../controller/tarefa/tarefa.builder';
import { Tarefa } from './../../model/tarefa';
import { Regime } from './../../model/regime';
import { RegimeService } from './../../controller/regime/regime.service';

@Component( {
    selector: 'app-mudanca-funcao',
    templateUrl: './mudanca-funcao.html',
    styleUrls: ['./mudanca-funcao.css']
} )
export class MudancaFuncaoComponent {
    globalActions;
    toastParams;
    tarefa: Tarefa;
    mudancaFuncao: MudancaFuncao;
    showConfirmSave: boolean;
    msgConfirmSave: string;
    goTo: string;
    
    constructor( private route: ActivatedRoute, private router: Router,
            private solicitacaoServicoService: SolicitacaoServicoService,
            private regimeService :RegimeService) {
        this.globalActions = new EventEmitter<string | MaterializeAction>();
        this.toastParams = ['', 4000];
        this.mudancaFuncao = new MudancaFuncaoBuilder().initialize(this.mudancaFuncao);       
        
    }

    ngOnInit() {
        
        if ( localStorage.getItem("tarefa") == undefined ) {
            this.router.navigate(["/solicitacao-servico/selecao-servico"]);
        } else {
            
            this.tarefa = new TarefaBuilder().clone(JSON.parse(localStorage.getItem("tarefa")));
            this.mudancaFuncao.getTarefas().push(this.tarefa);   
            localStorage.removeItem("tarefa");
            this.loadingEmpregado();
        }
    }

    next() {
        this.solicitacaoServicoService.registrarMudancaFuncao( new MudancaFuncaoBuilder().clone(this.mudancaFuncao) )
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
    
    loadingEmpregado() {            
        this.solicitacaoServicoService.getEmpregadoService().get(this.mudancaFuncao.getTarefas()[0].getCliente().getId())
           .then( res => {
               this.mudancaFuncao.getTarefas()[0].setCliente(new EmpregadoBuilder().clone( res.json() ));
               
               this.mudancaFuncao.setInstalacoes(new InstalacaoBuilder().cloneList(this.mudancaFuncao.getTarefas()[0]
                   .getCliente().getInstalacoes()));
           } )
           .catch( error => {
               console.log( error );
           } )
    }
}