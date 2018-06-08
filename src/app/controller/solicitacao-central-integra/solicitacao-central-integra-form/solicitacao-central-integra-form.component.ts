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
import { EmpregadoAutocomplete } from './../../../controller/empregado/empregado.autocomplete';
import { Pessoa } from './../../../model/pessoa';
import { PessoaFilter } from './../../../controller/pessoa/pessoa.filter';
import { EmpregadoFilter } from './../../../controller/empregado/empregado.filter';
import { SolicitacaoCentralIntegraBuilder } from './../solicitacao-central-integra.builder';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { SolicitacaoCentralIntegraService } from './../solicitacao-central-integra.service';

@Component( {
    selector: 'app-solicitacao-central-integra-form',
    templateUrl: './solicitacao-central-integra-form.html',
    styleUrls: ['./solicitacao-central-integra-form.css', './../../../../assets/css/form-component.css']
} )
export class SolicitacaoCentralIntegraFormComponent extends GenericFormComponent implements OnInit {
    private solicitacaoCentralIntegra: SolicitacaoCentralIntegra;
    private tipoSolicitacoes: Array<TipoSolicitacao>;
    private abertura: any;
    private prazo: any;
    private statuses: Array<string>;
    
    private showModalResponsavel: boolean;
    private showModalCliente: boolean;

    empregados: Array<Empregado>;
    validEmpregado: string;
    autocompleteEmpregado;
    
    profissionais: Array<Profissional>;
    validProfissional: string;
    autocompleteProfissional;
    
    private autoCompleteEmp:EmpregadoAutocomplete;
    
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
            
            
            this.autoCompleteEmp = new EmpregadoAutocomplete(this.solicitacaoCentralIntegraService.getEmpregadoService());
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
                            this.parseDatas();
                            
                            this.autoCompleteEmp.getAutocomplete().initializeLastValue(this.solicitacaoCentralIntegra
                                    .getTarefa().getCliente().getPessoa().getNome());
                        } )
                        .catch( error => {
                            this.catchConfiguration( error );
                        } )
                }
            } );
        this.getTipoSolicitacao();
        this.getStatuses();
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
        this.validDatas();
        super.save(new SolicitacaoCentralIntegraBuilder().clone(this.solicitacaoCentralIntegra));
    }
    
    validDatas() {
        if ( this.dateUtil.verifyData( this.prazo ) )
            this.solicitacaoCentralIntegra.setPrazo(
                    this.dateUtil.parseDatePickerToDate( this.prazo ) );
        
        if ( this.dateUtil.verifyData( this.abertura ) )
            this.solicitacaoCentralIntegra.setAbertura(
                    this.dateUtil.parseDatePickerToDate( this.abertura ) );
    }
    
    parseDatas() {
        if ( this.dateUtil.verifyData( this.solicitacaoCentralIntegra.getPrazo() ) )
            this.prazo = this.dateUtil.parseDataToObjectDatePicker( this.solicitacaoCentralIntegra.getPrazo() )
        
        if ( this.dateUtil.verifyData( this.solicitacaoCentralIntegra.getAbertura() ) )
            this.abertura = this.dateUtil.parseDataToObjectDatePicker( this.solicitacaoCentralIntegra.getAbertura() )
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
    
//    getEmpregado() {
//        if ( this.validEmpregado == this.solicitacaoCentralIntegra.getTarefa().getCliente().getPessoa().getNome() ) return;
//        if ( this.solicitacaoCentralIntegra.getTarefa().getCliente().getPessoa().getNome() !== undefined ) {
//            let empregado = this.empregados.find( e => {
//                if ( ( e.getChave() + " - " + e.getPessoa().getNome() ).trim() ==
//                    this.solicitacaoCentralIntegra.getTarefa().getCliente().getPessoa().getNome().trim() || 
//                    e.getPessoa().getNome().trim() == this.solicitacaoCentralIntegra.getTarefa().getCliente().getPessoa().getNome().trim() )
//                    return true;
//                else return false;
//            } );
//            
//            if ( empregado !== undefined ) {
//                this.solicitacaoCentralIntegra.getTarefa().setCliente( empregado );
//                this.validEmpregado = this.solicitacaoCentralIntegra.getTarefa().getCliente().getPessoa().getNome();
//            } else this.solicitacaoCentralIntegra.getTarefa().setCliente( new EmpregadoBuilder().initialize( new Empregado() ) );
//        } else this.solicitacaoCentralIntegra.getTarefa().setCliente( new EmpregadoBuilder().initialize( new Empregado() ) );
//    }
    
//    private oldENome: string;
//    selectEmpregado( evento ) {
//        if ( this.oldENome != evento ) {
//            this.oldENome = evento;
//            if ( evento.length > 4 ) {
//                this.solicitacaoCentralIntegraService.getEmpregadoByName( evento )
//                    .then( res => {
//                        this.empregados = new EmpregadoBuilder().cloneList(res.json());
//                        this.autocompleteEmpregado = [this.buildAutocompleteEmpregado( this.empregados )];
//                    } )
//                    .catch( error => {
//                        console.log( error );
//                    } )
//            }
//        }
//    }

//    private oldENomeByChave: string;
//    selectEmpregadoByChave( evento ) {
//        if ( this.oldENomeByChave != evento ) {
//            this.oldENomeByChave = evento;
//            if ( evento.length <= 4 ) {
//                this.solicitacaoCentralIntegraService.getEmpregadoByChave( evento )
//                    .then( res => {
//                        this.empregados = new EmpregadoBuilder().cloneList(res.json());
//                        this.autocompleteEmpregado = [this.buildAutocompleteEmpregado( this.empregados )];
//                    } )
//                    .catch( error => {
//                        console.log( error );
//                    } )
//            }
//        }
//    }

//    buildAutocompleteEmpregado( empregados ) {
//        let data = {};
//        empregados.forEach( item => {
//            data[item.getChave() + " - " + item.getPessoa().getNome()] = null;
//        } );
//
//        let array = {};
//        array["data"] = data;
//
//        return array;
//    }
    
    getProfissional() {
        if ( this.validProfissional == this.solicitacaoCentralIntegra.getTarefa().getResponsavel().getEmpregado().getPessoa().getNome() ) return;
        if ( this.solicitacaoCentralIntegra.getTarefa().getResponsavel().getEmpregado().getPessoa().getNome() !== undefined ) {
            let profissional = this.profissionais.find( e => {
                if ( ( e.getEmpregado().getChave() + " - " + e.getEmpregado().getPessoa().getNome() ).trim() ==
                    this.solicitacaoCentralIntegra.getTarefa().getResponsavel().getEmpregado().getPessoa().getNome().trim() || 
                    e.getEmpregado().getPessoa().getNome().trim() == this.solicitacaoCentralIntegra.getTarefa().getResponsavel().getEmpregado().getPessoa().getNome().trim() )
                    return true;
                else return false;
            } );
            
            if ( profissional !== undefined ) {
                console.log(profissional)
                this.solicitacaoCentralIntegra.getTarefa().setResponsavel( profissional );
                this.validEmpregado = this.solicitacaoCentralIntegra.getTarefa().getResponsavel().getEmpregado().getPessoa().getNome();
            } else this.solicitacaoCentralIntegra.getTarefa().setResponsavel( new ProfissionalSaudeBuilder().initialize( new Profissional() ) );
        } else this.solicitacaoCentralIntegra.getTarefa().setResponsavel( new ProfissionalSaudeBuilder().initialize( new Profissional() ) );
    }
    
    private oldNome: string;
    selectProfissional( evento ) {
        if ( this.oldNome != evento ) {
            this.oldNome = evento;
            if ( evento.length > 4 ) {
                let profissionalFilter: ProfissionalSaudeFilter = new ProfissionalSaudeFilter();
                profissionalFilter.setEmpregado(new EmpregadoFilter());
                profissionalFilter.getEmpregado().setPessoa(new PessoaFilter());
                profissionalFilter.getEmpregado().getPessoa().setNome(evento);
                
                this.solicitacaoCentralIntegraService.getProfissionais( profissionalFilter )
                    .then( res => {
                        this.profissionais = new ProfissionalSaudeBuilder().cloneList(res.json());
                        this.autocompleteProfissional = [this.buildAutocompleteProfissional( this.profissionais )];
                    } )
                    .catch( error => {
                        console.log( error );
                    } )
            }
        }
    }

    private oldNomeByChave: string;
    selectProfissionalByChave( evento ) {
        if ( this.oldNomeByChave != evento ) {
            this.oldNomeByChave = evento;
            if ( evento.length <= 4 ) {
                let profissionalFilter: ProfissionalSaudeFilter = new ProfissionalSaudeFilter();
                profissionalFilter.setEmpregado(new EmpregadoFilter());
                profissionalFilter.getEmpregado().setChave(evento);
                
                this.solicitacaoCentralIntegraService.getProfissionais( profissionalFilter )
                    .then( res => {
                        this.profissionais = new ProfissionalSaudeBuilder().cloneList(res.json().list);
                        this.autocompleteProfissional = [this.buildAutocompleteProfissional( this.profissionais )];
                    } )
                    .catch( error => {
                        console.log( error );
                    } )
            }
        }
    }

    buildAutocompleteProfissional( profissionais ) {
        let data = {};
        profissionais.forEach( item => {
            data[item.getEmpregado().getChave() + " - " + item.getEmpregado().getPessoa().getNome()] = null;
        } );

        let array = {};
        array["data"] = data;

        return array;
    }
}