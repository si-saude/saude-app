import { Component, ViewChild, ElementRef, OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { MaterializeDirective,MaterializeAction } from "angular2-materialize";

import { GlobalVariable } from './../../../global';
import { StatusSolicitacaoConst } from './../../../generics/consts/status-solicitacao.const';
import { SolicitacaoCentralIntegra } from './../../../model/solicitacao-central-integra';
import { TipoSolicitacao } from './../../../model/tipo-solicitacao';
import { TipoSolicitacaoBuilder } from './../../tipo-solicitacao/tipo-solicitacao.builder';
import { Profissional } from './../../../model/profissional';
import { ProfissionalSaudeBuilder } from './../../../controller/profissional-saude/profissional-saude.builder';
import { ProfissionalSaudeFilter } from './../../../controller/profissional-saude/profissional-saude.filter';
import { Empregado } from './../../../model/empregado';
import { EmpregadoNomeAutocomplete } from './../../../controller/empregado/empregado-nome.autocomplete';
import { ProfissionalNomeAutocomplete } from './../../../controller/profissional-saude/profissional-nome.autocomplete';
import { Pessoa } from './../../../model/pessoa';
import { PessoaFilter } from './../../../controller/pessoa/pessoa.filter';
import { EmpregadoFilter } from './../../../controller/empregado/empregado.filter';
import { SolicitacaoCentralIntegraBuilder } from './../solicitacao-central-integra.builder';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { SolicitacaoCentralIntegraService } from './../solicitacao-central-integra.service';
import { CssUtil } from './../../../generics/utils/css.util';
import { HttpUtil } from './../../../generics/utils/http.util';

@Component( {
    selector: 'app-solicitacao-central-integra-form',
    templateUrl: './solicitacao-central-integra-form.html',
    styleUrls: ['./solicitacao-central-integra-form.css', './../../../../assets/css/form-component.css']
} )
export class SolicitacaoCentralIntegraFormComponent extends GenericFormComponent implements OnInit {
    private solicitacaoCentralIntegra: SolicitacaoCentralIntegra;
    private tipoSolicitacoes: Array<TipoSolicitacao>;
    private statuses: Array<string>;
    
    private showModalResponsavel: boolean;
    private showModalCliente: boolean;

    empregados: Array<Empregado>;
    validEmpregado: string;
    autocompleteEmpregado;
    
    profissionais: Array<Profissional>;
    validProfissional: string;
    autocompleteProfissional;
    
    private autoCompleteEmp:EmpregadoNomeAutocomplete;
    private autoCompleteProf:ProfissionalNomeAutocomplete;
    
    private cssUtil: CssUtil;
    
    constructor( private route: ActivatedRoute,
            private solicitacaoCentralIntegraService: SolicitacaoCentralIntegraService,
            router: Router) { 
            super(solicitacaoCentralIntegraService, router);
            this.goTo = "$*close*$";
            this.solicitacaoCentralIntegra = new SolicitacaoCentralIntegraBuilder().initialize(new SolicitacaoCentralIntegra());
            this.tipoSolicitacoes = new TipoSolicitacaoBuilder().initializeList(new Array<TipoSolicitacao>());
            this.statuses = new Array<string>();
            
            this.showModalCliente = false;
            this.showModalResponsavel = false;
            
            this.empregados = new Array<Empregado>();
            this.validEmpregado = "";
            this.autocompleteEmpregado = [];
            
            this.profissionais = new Array<Profissional>();
            this.validProfissional = "";
            this.autocompleteProfissional = [];
            
            this.autoCompleteEmp = new EmpregadoNomeAutocomplete(this.solicitacaoCentralIntegraService.getEmpregadoService());
            this.autoCompleteProf = new ProfissionalNomeAutocomplete(this.solicitacaoCentralIntegraService.getProfissionalService());
            
            this.cssUtil = new CssUtil();
    }
    
    ngOnInit() {
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                if( params['id'] !== undefined ) {
                    let id = params['id'];
                    this.showPreload = true;

                    this.solicitacaoCentralIntegraService.get( id )
                        .then( res => {
                            this.showPreload = false;
                            this.solicitacaoCentralIntegra = new SolicitacaoCentralIntegraBuilder().clone(res.json());
                            this.initializeObjects();
                            
                            this.autoCompleteEmp.getAutocomplete().initializeLastValue(this.solicitacaoCentralIntegra
                                    .getTarefa().getCliente().getPessoa().getNome());
                            this.autoCompleteProf.getAutocomplete().initializeLastValue(this.solicitacaoCentralIntegra
                                    .getTarefa().getResponsavel().getEmpregado().getPessoa().getNome());
                        } )
                        .catch( error => {
                            this.catchConfiguration( error );
                        } )
                }
            } );
        this.getTipoSolicitacao();
        this.getStatuses();
        this.cssUtil.overflowTextarea("#descricao");
        this.cssUtil.overflowTextarea("#observacao");
    }
    
    getStatuses() {
        this.solicitacaoCentralIntegraService.getStatusSolicitacao()
            .then(res => {
                this.statuses = Object.keys( res.json() ).sort();
            })
            .catch(error => {
                console.log("Erro ao buscar statuses.");
            })
    }
    
    getTipoSolicitacao() {
        this.solicitacaoCentralIntegraService.getTipoSolicitacoes()
            .then(res => {
                this.tipoSolicitacoes = new TipoSolicitacaoBuilder().cloneList(res.json());
            })
            .catch(error => {
                console.log(error);
            })
    }
    
    initializeObjects() {
        if ( this.solicitacaoCentralIntegra.getTarefa().getResponsavel() == undefined )
            this.solicitacaoCentralIntegra.getTarefa().setResponsavel(
                    new ProfissionalSaudeBuilder().initialize(new Profissional()));
    }
    
    setConcluido() {
        let concluido = <HTMLInputElement>document.getElementById("concluido");
        if ( concluido.checked )
            this.solicitacaoCentralIntegra.setConcluido(true);
        else this.solicitacaoCentralIntegra.setConcluido(false);
    }
    
    
    save() {
        super.save(new SolicitacaoCentralIntegraBuilder().clone(this.solicitacaoCentralIntegra));
    }
    
    openModalResponsavel() {
        this.showModalResponsavel = true;
    }
    
    selectResponsavel(responsavel: Profissional) {
        this.solicitacaoCentralIntegra.getTarefa().setResponsavel(responsavel);
        this.showModalResponsavel = false;
    }
    
    cancelarModalResponsavel( valor ) {
        this.showModalResponsavel = false;
    }
    
    openModalCliente() {
        this.showModalCliente = true;
    }
    
    selectCliente(cliente: Empregado) {
        this.solicitacaoCentralIntegra.getTarefa().setCliente(cliente);
        this.showModalCliente = false;
    }
    
    cancelarModalCliente( valor ) {
        this.showModalCliente = false;
    }
    
    getMsgConfirmSave(res: any){
        return "Salvo com sucesso.";
    }

}