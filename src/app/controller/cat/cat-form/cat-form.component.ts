import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import * as $ from 'jquery';
import { MaterializeAction } from "angular2-materialize";

import { GlobalVariable } from './../../../global';
import { Cat } from './../../../model/cat'; 
import { CatBuilder } from './../cat.builder';
import { CatService } from './../cat.service';
import { Cargo } from './../../../model/cargo';
import { CargoBuilder } from './../../cargo/cargo.builder';
import { Funcao } from './../../../model/funcao';
import { ClassificacaoAfastamento } from './../../../model/classificacao-afastamento';
import { ClassificacaoAfastamentoBuilder } from './../../classificacao-afastamento/classificacao-afastamento.builder';
import { FuncaoBuilder } from './../../funcao/funcao.builder';
import { EmpregadoBuilder } from './../../empregado/empregado.builder';
import { GerenciaCodigoCompletoAutocomplete } from './../../gerencia/gerencia-codigo-completo.autocomplete';
import { EmpregadoNomeAutocomplete } from './../../empregado/empregado-nome.autocomplete';
import { EmpresaNomeAutocomplete } from './../../empresa/empresa-nome.autocomplete';
import { ProfissionalCatNomeAutocomplete } from './../../profissional-saude/profissional-cat-nome.autocomplete';
import { DiagnosticoAtestadoAutocomplete } from './../../diagnostico/diagnostico-atestado.autocomplete';
import { DiagnosticoFilter } from './../../diagnostico/diagnostico.filter';
import { GenericFormComponent } from './../../../generics/generic.form.component';

@Component( {
    selector: 'app-cat-form',
    templateUrl: './cat-form.html',
    styleUrls: ['./cat-form.css', './../../../../assets/css/form-component.css']
} )
export class CatFormComponent extends GenericFormComponent implements OnInit {
    private cat: Cat;
    private cargos: Array<Cargo>;
    private escolaridades: Array<string>;
    private estadosCivis: Array<string>;
    private autoCompleteGerencia: GerenciaCodigoCompletoAutocomplete;
    private autoCompleteGerenciaEmpregado: GerenciaCodigoCompletoAutocomplete;
    private autoCompleteEmpregado: EmpregadoNomeAutocomplete;
    private autoCompleteEmpresa: EmpresaNomeAutocomplete;
    private autoCompleteProfissionalCaracterizacao: ProfissionalCatNomeAutocomplete;
    private autoCompleteProfissionalClassificacao: ProfissionalCatNomeAutocomplete;
    private autoCompleteCid: DiagnosticoAtestadoAutocomplete;
    private vinculos: Array<string>;
    private funcoes: Array<Funcao>;
    private classificacoes: Array<ClassificacaoAfastamento>;
    private nexoCausais: Array<string>;

    private timeActions;
    
    constructor( private route: ActivatedRoute,
        private catService: CatService,
        router: Router) {
        super( catService, router );

        this.goTo = "cat";
        this.cat = new CatBuilder().initialize( this.cat );
        this.cargos = new CargoBuilder().initializeList( this.cargos );
        this.escolaridades = new Array<string>();
        this.estadosCivis = new Array<string>();
        this.vinculos = new Array<string>();
        this.autoCompleteGerencia = new GerenciaCodigoCompletoAutocomplete(this.catService.getGerenciaService());
        this.autoCompleteGerenciaEmpregado = new GerenciaCodigoCompletoAutocomplete(this.catService.getGerenciaService());
        this.autoCompleteEmpregado = new EmpregadoNomeAutocomplete(this.catService.getEmpregadoService());
        this.autoCompleteEmpresa = new EmpresaNomeAutocomplete(this.catService.getEmpresaService());
        this.autoCompleteProfissionalCaracterizacao = new ProfissionalCatNomeAutocomplete(this.catService.getProfissionalService());
        this.autoCompleteCid = new DiagnosticoAtestadoAutocomplete(this.catService.getDiagnosticoService(), new DiagnosticoFilter());
        this.autoCompleteProfissionalClassificacao = new ProfissionalCatNomeAutocomplete(this.catService.getProfissionalService());
        this.funcoes = new FuncaoBuilder().initializeList( this.funcoes );
        this.classificacoes = new ClassificacaoAfastamentoBuilder().initializeList(this.classificacoes);
        this.nexoCausais = new Array<string>();
        
        this.timeActions = new EventEmitter<string|MaterializeAction>();
    }

    ngOnInit() {
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                if ( params['id'] !== undefined ) {
                    let id = params['id'];
                    this.showPreload = true;

                    this.service.get( id )
                        .then( res => {
                            this.showPreload = false;
                            this.cat = new CatBuilder().clone( res.json() );
                            
                            if ( this.cat.getEmpregado() ) 
                                this.autoCompleteEmpregado.getAutocomplete().initializeLastValue(
                                        this.cat.getEmpregado().getPessoa().getNome());
                            
                            if ( this.cat.getEmpregado() && this.cat.getEmpregado().getGerencia() )
                                this.autoCompleteGerencia.getAutocomplete().initializeLastValue(
                                        this.cat.getEmpregado().getGerencia().getCodigoCompleto());
                            
                            if ( this.cat.getEmpresa() )
                                this.autoCompleteEmpresa.getAutocomplete().initializeLastValue(
                                        this.cat.getEmpresa().getNome());
                            
                            if ( this.cat.getProfissionalCaracterizacao() )
                                this.autoCompleteProfissionalCaracterizacao.getAutocomplete().initializeLastValue(
                                        this.cat.getProfissionalCaracterizacao().getEmpregado().getPessoa().getNome());
                            
                            if ( this.cat.getCid() )
                                this.autoCompleteCid.getAutocomplete().initializeLastValue(
                                        this.cat.getCid().getCodigo());
                            
                            if ( this.cat.getProfissionalClassificacao() )
                                this.autoCompleteProfissionalCaracterizacao.getAutocomplete().initializeLastValue(
                                        this.cat.getProfissionalClassificacao().getEmpregado().getPessoa().getNome());
                        } )
                        .catch( error => {
                            this.catchConfiguration( error );
                        } )
                }
            } );
        
        this.getCargos();
        this.getEscolaridades();
        this.getEstadosCivis();
        this.getVinculos();
        this.getFuncoes();
        this.getClassificacoes();
        this.getNexoCausais();
    }
    
    getCargos() {
        this.catService.getCargoService().getCargos()
            .then(res => {
                this.cargos = new CargoBuilder().cloneList(res.json());
            })
            .catch(error => {
                this.catchConfiguration(error);
            })
    }
    
    getEscolaridades() {
        this.catService.getEscolaridades()
            .then(res => {
                this.escolaridades = Object.keys(res.json()).sort();
            })
            .catch(error => {
                this.catchConfiguration(error);
            })
    }
    
    getEstadosCivis() {
        this.catService.getEstadosCivis()
            .then(res => {
                this.estadosCivis = Object.keys(res.json()).sort();
            })
            .catch(error => {
                this.catchConfiguration(error);
            })
    }
    
    getVinculos() {
        this.catService.getVinculos()
            .then(res => {
                this.vinculos = Object.keys(res.json()).sort();
            })
            .catch(error => {
                this.catchConfiguration(error);
            })
    }
    
    getFuncoes() {
        this.catService.getFuncaoService().getFuncoes()
            .then(res => {
                this.funcoes = new FuncaoBuilder().cloneList(res.json());
            })
            .catch(error => {
                this.catchConfiguration(error);
            })
    }
    
    getClassificacoes() {
        this.catService.getClassificacaoService().getClassificacaoAfastamentos()
            .then(res => {
                this.classificacoes = new ClassificacaoAfastamentoBuilder().cloneList(res.json());
            })
            .catch(error => {
                this.catchConfiguration(error);
            })
    }
    
    getNexoCausais() {
        this.catService.getNexoCausais()
            .then(res => {
                this.nexoCausais = Object.keys( res.json() ).sort();
            })
            .catch(error => {
                this.catchConfiguration(error);
            })
    }
    
    save() {
        super.save( new CatBuilder().clone( this.cat ) );
    }
    
    changeEmpregado() {
        setTimeout(() => {
            if ( this.cat.getEmpregado().getId() > 0 ) {
                this.cat.setGerencia(this.cat.getEmpregado().getGerencia());
            }
        }, 250);
    }
    
    cadastrarContratado() {
        if ( this.cat.getEmpregado().getNome() == '' || this.cat.getEmpregado().getNome() == undefined || 
                this.cat.getEmpregado().getMatricula() == '' || this.cat.getEmpregado().getMatricula() == undefined ||
                this.cat.getEmpregado().getChave() == '' || this.cat.getEmpregado().getChave() == undefined || 
                this.cat.getEmpregado().getPessoa().getCpf() == '' || this.cat.getEmpregado().getPessoa().getCpf() == undefined ||
                this.cat.getEmpregado().getGerencia().getId() ==  0 || this.cat.getEmpregado().getGerencia().getId() == undefined || 
                this.cat.getEmpregado().getPessoa().getDataNascimento() == undefined ||
                this.cat.getEmpregado().getCargo() == undefined || 
                this.cat.getEmpregado().getCargo().getId() == 0 || this.cat.getEmpregado().getCargo().getId() == undefined ||
                this.cat.getEmpregado().getFuncao() == undefined || 
                this.cat.getEmpregado().getFuncao().getId() == 0 || this.cat.getEmpregado().getFuncao().getId() == undefined) {
            this.toastParams = ["Por favor, complete todos os dados do empregado.", 4000];
            this.globalActions.emit( 'toast' );
            return;
        }
        
        this.cat.getEmpregado().setVinculo("CONTRATADO");
        this.catService.getEmpregadoService().saveAndReturn(new EmpregadoBuilder().clone(this.cat.getEmpregado()))
            .then(res => {
                this.cat.setEmpregado(new EmpregadoBuilder().clone(res.json()));
                this.verifyError = false;
                this.toastParams = ["Sucesso ao salvar o empregado.", 4000];
                this.globalActions.emit( 'toast' );
            })
            .catch(error => {
                this.toastParams = ["Erro ao salvar o empregado.", 4000];
                this.globalActions.emit( 'toast' );
                this.catchConfiguration(error);
            })
    }
    
    getNexoCausal() {
        if ( this.cat.getNexoCausal() == undefined ) return "";
        else if ( this.cat.getNexoCausal().includes("APLIC") )
            return "naoAplicavel";
        else if ( this.cat.getNexoCausal().includes("N") )
            return "nao";
        else return "sim";
    }
    
    setNexoCausal( value ) {
        switch(value) {
            case "nao":
                this.cat.setNexoCausal(this.nexoCausais[0]);
                break;
            case "naoAplicavel":
                this.cat.setNexoCausal(this.nexoCausais[1]);
                break;
            case "sim":
                this.cat.setNexoCausal(this.nexoCausais[2]);
                break;
        }
    }
}