import { Component, EventEmitter, Input, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterializeAction } from "angular2-materialize";

import { MudancaFuncao } from './../../model/mudanca-funcao';
import { GrupoMonitoramento } from './../../model/grupo-monitoramento';
import { Regime } from './../../model/regime';
import { Instalacao } from './../../model/instalacao';
import { MudancaFuncaoBuilder } from './../../controller/mudanca-funcao/mudanca-funcao.builder';
import { InstalacaoBuilder } from './../../controller/instalacao/instalacao.builder';
import { GrupoMonitoramentoBuilder } from './../../controller/grupo-monitoramento/grupo-monitoramento.builder';
import { RegimeService } from './../../controller/regime/regime.service';
import { GheNomeAutocomplete } from './../../controller/ghe/ghe-nome.autocomplete';
import { GerenciaCodigoCompletoAutocomplete } from './../../controller/gerencia/gerencia-codigo-completo.autocomplete';
import { GheeNomeAutocomplete } from './../../controller/ghee/ghee-nome.autocomplete';
import { FuncaoNomeAutocomplete } from './../../controller/funcao/funcao-nome.autocomplete';
import { BaseNomeAutocomplete } from './../../controller/base/base-nome.autocomplete';
import { EnfaseDescricaoAutocomplete } from './../../controller/enfase/enfase-descricao.autocomplete';

@Component( {
    selector: 'app-include-mudanca-funcao',
    templateUrl: './include-mudanca-funcao.html',
    styleUrls: ['./include-mudanca-funcao.css']
} )
export class IncludeMudancaFuncaoComponent {
    
    @Input() mudancaFuncao: MudancaFuncao;
    @Input() service;
    @Input() desabilitarGhe: boolean;
    @Input() desabilitarGhee: boolean;
    
    private autoCompleteGhe:GheNomeAutocomplete;
    private autoCompleteGerencia: GerenciaCodigoCompletoAutocomplete;
    private autoCompleteEnfase:EnfaseDescricaoAutocomplete;
    private autoCompleteFuncao:FuncaoNomeAutocomplete;
    private autoCompleteGhee:GheeNomeAutocomplete;
    private autoCompleteBase:BaseNomeAutocomplete;
    regimes: Array<Regime>;
    private modalInstalacao;
    private instalacao: Instalacao;
    private grupoMonitoramento: GrupoMonitoramento;
    instalacoes: Array<Instalacao>;
    gruposMonitoramento: Array<GrupoMonitoramento>;
    
    constructor( private route: ActivatedRoute, private router: Router) {
        
     }

    ngOnInit() {        
        this.autoCompleteGhe = new GheNomeAutocomplete(this.service.getGheService());
        this.autoCompleteGerencia = new GerenciaCodigoCompletoAutocomplete(this.service.getGerenciaService());
        this.autoCompleteEnfase = new EnfaseDescricaoAutocomplete(this.service.getEnfaseService());
        this.autoCompleteFuncao = new FuncaoNomeAutocomplete(this.service.getFuncaoService());
        this.autoCompleteGhee = new GheeNomeAutocomplete(this.service.getGheeService());
        this.autoCompleteBase = new BaseNomeAutocomplete(this.service.getBaseService());     
        this.modalInstalacao = new EventEmitter<string | MaterializeAction>();
        this.instalacao = new InstalacaoBuilder().initialize(new Instalacao());
        this.grupoMonitoramento = new GrupoMonitoramentoBuilder().initialize(new GrupoMonitoramento());
        this.getRegimes();
        this.getInstalacoes();
        this.getGruposMonitoramento();
    }   
    
    ngOnChanges( changes: SimpleChanges ) {
        if ( changes["mudancaFuncao"] != undefined ){
            if(this.mudancaFuncao.getId() > 0){
                this.autoCompleteGhe.getAutocomplete().initializeLastValue(this.mudancaFuncao.getGhe().getNome());         
                this.autoCompleteGerencia.getAutocomplete().initializeLastValue(this.mudancaFuncao.getGerencia().getCodigoCompleto());         
                this.autoCompleteEnfase.getAutocomplete().initializeLastValue(this.mudancaFuncao.getEnfase().getDescricao());         
                this.autoCompleteFuncao.getAutocomplete().initializeLastValue(this.mudancaFuncao.getFuncao().getNome());         
                this.autoCompleteGhee.getAutocomplete().initializeLastValue(this.mudancaFuncao.getGhee().getNome());         
                this.autoCompleteBase.getAutocomplete().initializeLastValue(this.mudancaFuncao.getBase().getNome());       
            }
        }
    }
    
    getInstalacoes() {
        this.service.getInstalacaoService().getInstalacoes()
            .then( res => {
                this.instalacoes = new InstalacaoBuilder().cloneList( res.json() );
            } )
            .catch( error => {
                console.log( error );
            } )
    }
    
    getGruposMonitoramento() {
        this.service.getGruposMonitoramentoService().getGruposMonitoramento()
            .then( res => {
                this.gruposMonitoramento = new GrupoMonitoramentoBuilder().cloneList( res.json() );
            } )
            .catch( error => {
                console.log( error );
            } )
    }
    
    getRegimes() {
        this.service.getRegimes()
            .then( res => {
                this.regimes = res.json();
            } )
            .catch( error => {
                console.log( error );
            } )
    }
    openModal() {
        this.modalInstalacao.emit( { action: "modal", params: ['open'] } );
    }

    closeModal() {
        this.modalInstalacao.emit( { action: "modal", params: ['close'] } );
    }
    confirmAddInstalacao(){
        if(this.mudancaFuncao.getInstalacoes().find(i => i.getId() == this.instalacao.getId()) == undefined){
            this.instalacao = new InstalacaoBuilder().clone(this.instalacoes.find(x  => x.getId() == this.instalacao.getId()));
            if(this.mudancaFuncao.getInstalacoes() == undefined)
                this.mudancaFuncao.setInstalacoes(new InstalacaoBuilder().initializeList(undefined));
            this.mudancaFuncao.getInstalacoes().push(this.instalacao);
        }
        this.instalacao = new InstalacaoBuilder().initialize( new Instalacao( ));        
    }
    addInstalacao() {
        this.instalacao = new InstalacaoBuilder().initialize(new Instalacao( ));        
        this.openModal();
    }

    addGrupoMonitoramento() {        
        
        if(this.mudancaFuncao.getGrupoMonitoramentos() == undefined){
            this.mudancaFuncao.setGrupoMonitoramentos(new GrupoMonitoramentoBuilder().initializeList(undefined));
        }
        if(this.mudancaFuncao.getGrupoMonitoramentos().find(i => i.getId() == this.grupoMonitoramento.getId()) == undefined){
            this.grupoMonitoramento = new GrupoMonitoramentoBuilder().clone(this.gruposMonitoramento.find(i => i.getId() == this.grupoMonitoramento.getId()))
            this.mudancaFuncao.getGrupoMonitoramentos().push(new GrupoMonitoramentoBuilder().clone(this.grupoMonitoramento));            
        }
               
    }
    removeGrupoMonitoramento(indexGrupoMonitoramento: number) {
        this.mudancaFuncao.getGrupoMonitoramentos().splice(indexGrupoMonitoramento, 1);
    }
    
    removeInstalacao(indexInstalacao: number) {
        this.mudancaFuncao.getInstalacoes().splice(indexInstalacao, 1);
    }
    
}