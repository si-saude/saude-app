import { Component, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MaterializeAction } from "angular2-materialize";
import { MyDatePickerModule } from 'mydatepicker';
import { IMyDpOptions } from 'mydatepicker';

import { MudancaFuncao } from './../../model/mudanca-funcao';
import { MudancaFuncaoBuilder } from './../../controller/mudanca-funcao/mudanca-funcao.builder';
import { SolicitacaoServicoService } from './../solicitacao-servico.service';
import { TarefaBuilder } from './../../controller/tarefa/tarefa.builder';
import { Tarefa } from './../../model/tarefa';
import { Regime } from './../../model/regime';
import { DateUtil } from './../../generics/utils/date.util';
import { GheNomeAutocomplete } from './../../controller/ghe/ghe-nome.autocomplete';
import { GerenciaCodigoCompletoAutocomplete } from './../../controller/gerencia/gerencia-codigo-completo.autocomplete';
import { GheeNomeAutocomplete } from './../../controller/ghee/ghee-nome.autocomplete';
import { FuncaoNomeAutocomplete } from './../../controller/funcao/funcao-nome.autocomplete';
import { BaseNomeAutocomplete } from './../../controller/base/base-nome.autocomplete';
import { CargoNomeAutocomplete } from './../../controller/cargo/cargo-nome.autocomplete';

@Component( {
    selector: 'app-mudanca-funcao',
    templateUrl: './mudanca-funcao.html',
    styleUrls: ['./mudanca-funcao.css']
} )
export class MudancaFuncaoComponent {
    private autoCompleteGhe:GheNomeAutocomplete;
    private autoCompleteGerencia: GerenciaCodigoCompletoAutocomplete;
    private autoCompleteCargo:CargoNomeAutocomplete;
    private autoCompleteFuncao:FuncaoNomeAutocomplete;
    private autoCompleteGhee:GheeNomeAutocomplete;
    private autoCompleteBase:BaseNomeAutocomplete;
    regimes: Array<Regime>;
    globalActions;
    toastParams;
    tarefa: Tarefa;
    mudancaFuncao: MudancaFuncao;
    dataInicio: any;
    showConfirmSave: boolean;
    msgConfirmSave: string;
    goTo: string;
    
    constructor( private route: ActivatedRoute, private router: Router,
            private solicitacaoServicoService: SolicitacaoServicoService) {
        this.globalActions = new EventEmitter<string | MaterializeAction>();
        this.toastParams = ['', 4000];
        this.mudancaFuncao = new MudancaFuncaoBuilder().initialize(this.mudancaFuncao);
        this.autoCompleteGhe = new GheNomeAutocomplete(this.solicitacaoServicoService.getGheService());
        this.autoCompleteGerencia = new GerenciaCodigoCompletoAutocomplete(this.solicitacaoServicoService.getGerenciaService());
        this.autoCompleteCargo = new CargoNomeAutocomplete(this.solicitacaoServicoService.getCargoService());
        this.autoCompleteFuncao = new FuncaoNomeAutocomplete(this.solicitacaoServicoService.getFuncaoService());
        this.autoCompleteGhee = new GheeNomeAutocomplete(this.solicitacaoServicoService.getGheeService());
        this.autoCompleteBase = new BaseNomeAutocomplete(this.solicitacaoServicoService.getBaseService());
        
    }

    ngOnInit() {
        
        if ( localStorage.getItem("tarefa") == undefined ) {
            this.router.navigate(["/solicitacao-servico/selecao-servico"]);
        } else {
            
            this.tarefa = new TarefaBuilder().clone(JSON.parse(localStorage.getItem("tarefa")));
            this.mudancaFuncao.getTarefas().push(this.tarefa);            
            localStorage.removeItem("tarefa");
        }
        this.getRegimes();
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
    
    getRegimes() {
        this.solicitacaoServicoService.getRegimes()
            .then( res => {
                this.regimes = res.json();
            } )
            .catch( error => {
                console.log( error );
            } )
    }
    
}