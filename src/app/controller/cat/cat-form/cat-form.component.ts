import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import * as $ from 'jquery';
import { MaterializeAction } from "angular2-materialize";

import { GlobalVariable } from './../../../global';
import { Diagnostico } from './../../../model/diagnostico';
import { Cat } from './../../../model/cat';
import { Base } from './../../../model/base';
import { BaseBuilder } from './../../base/base.builder';
import { Empregado } from './../../../model/empregado';
import { Gerencia } from './../../../model/gerencia';
import { CatBuilder } from './../cat.builder';
import { CatService } from './../cat.service';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { GerenciaCodigoCompletoAutocomplete } from './../../gerencia/gerencia-codigo-completo.autocomplete';
import { GerenciaService } from './../../gerencia/gerencia.service';
import { GerenciaBuilder } from './../../gerencia/gerencia.builder';
import { EmpregadoNomeAutocomplete } from './../../empregado/empregado-nome.autocomplete';
import { FornecedorRazaoSocialAutocomplete } from './../../fornecedor/fornecedor-razao-social.autocomplete';
import { FornecedorService } from './../../fornecedor/fornecedor.service';
import { EmpregadoService } from './../../empregado/empregado.service';
import { EmpregadoBuilder } from './../../empregado/empregado.builder';
import { ParteCorpoAtingidaDescricaoAutocomplete } from './../../parte-corpo-atingida/parte-corpo-atingida-descricao.autocomplete';
import { AgenteCausadorDescricaoAutocomplete } from './../../agente-causador/agente-causador-descricao.autocomplete';
import { NaturezaLesaoDescricaoAutocomplete } from './../../natureza-lesao/natureza-lesao-descricao.autocomplete';

@Component( {
    selector: 'app-cat-form',
    templateUrl: './cat-form.html',
    styleUrls: ['./cat-form.css', './../../../../assets/css/form-component.css']
} )
export class CatFormComponent extends GenericFormComponent implements OnInit {
    private cat: Cat;
    private bases: Array<Base>;
    private ufs: Array<string>;
    private sexos: Array<string>;
    private partesCorpo: Array<string>;
    private gravidades: Array<string>;
    private tipoAcidentes: Array<string>;
    private tipoCats: Array<string>;
    private showModalDiagnostico: boolean;
    private innerIdEquipe: number = 0;
    private diaHoraAcidente: string;
    private diaHoraAcidenteTimeActions;

    private autoCompleteGerencia: GerenciaCodigoCompletoAutocomplete;
    private autoCompleteEmpregado: EmpregadoNomeAutocomplete;
    private autoCompleteEmpresa: FornecedorRazaoSocialAutocomplete;
    private autoCompleteParteCorpoAtingida: ParteCorpoAtingidaDescricaoAutocomplete;
    private autoCompleteAgenteCausador: AgenteCausadorDescricaoAutocomplete;
    private autoCompleteNaturezaLesao: NaturezaLesaoDescricaoAutocomplete;

    constructor( private route: ActivatedRoute,
        private catService: CatService,
        private gerenciaService: GerenciaService,
        private empregadoService: EmpregadoService,
        private fornecedorService: FornecedorService,
        router: Router) {
        super( catService, router );

        this.goTo = "cat";
        this.cat = new CatBuilder().initialize( this.cat );
        this.autoCompleteGerencia = new GerenciaCodigoCompletoAutocomplete(this.gerenciaService);
        this.autoCompleteEmpregado = new EmpregadoNomeAutocomplete(this.empregadoService);
        this.autoCompleteEmpresa =  new FornecedorRazaoSocialAutocomplete(this.fornecedorService);
        this.autoCompleteParteCorpoAtingida = new ParteCorpoAtingidaDescricaoAutocomplete(this.catService.getParteCorpoAtingidaService())
        this.autoCompleteAgenteCausador = new AgenteCausadorDescricaoAutocomplete(this.catService.getAgenteCausadorService())
        this.autoCompleteNaturezaLesao = new NaturezaLesaoDescricaoAutocomplete(this.catService.getNaturezaLesaoService())
        this.bases = new BaseBuilder().initializeList(new Array<Base>());
        this.sexos = new Array<string>();
        this.partesCorpo = new Array<string>();
        this.gravidades = new Array<string>();
        this.tipoAcidentes = new Array<string>();
        this.tipoCats = new Array<string>();
        this.diaHoraAcidenteTimeActions = new EventEmitter<string|MaterializeAction>();
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
                            
                            if ( this.cat.getGerencia() != undefined )
                                this.autoCompleteGerencia.getAutocomplete().initializeLastValue(this.cat.getGerencia().getCodigoCompleto());
                            if ( this.cat.getEmpregado() != undefined )
                                this.autoCompleteEmpregado.getAutocomplete().initializeLastValue(this.cat.getEmpregado().getPessoa().getNome());
                            if ( this.cat.getEmpresa() != undefined ) 
                                this.autoCompleteEmpresa.getAutocomplete().initializeLastValue(this.cat.getEmpresa().getRazaoSocial());
                            if ( this.cat.getParteCorpoAtingida() != undefined ) 
                                this.autoCompleteParteCorpoAtingida.getAutocomplete().initializeLastValue(this.cat.getParteCorpoAtingida().getDescricao());
                            if ( this.cat.getAgenteCausador() != undefined ) 
                                this.autoCompleteAgenteCausador.getAutocomplete().initializeLastValue(this.cat.getAgenteCausador().getDescricao());
                            if ( this.cat.getNaturezaLesao() != undefined ) 
                                this.autoCompleteNaturezaLesao.getAutocomplete().initializeLastValue(this.cat.getNaturezaLesao().getDescricao());
                        } )
                        .catch( error => {
                            this.catchConfiguration( error );
                        } )
                }
            } );
        
        this.getSexos();
        this.getPartesCorpo();
        this.getGravidades();
        this.getTipoAcidentes();
        this.getTipoCats();
        this.getBases();
    }
    
    getBases() {
        this.catService.getBases()
            .then( res => {
                this.bases = new BaseBuilder().cloneList(res.json());
            })
            .catch( erro => {
                console.log("Erro ao buscar as bases.");
            })
    }
    
    getSexos() {
        this.catService.getSexos()
            .then( res => {
                this.sexos = Object.keys( res.json() ).sort();
            })
            .catch(error => {
                console.log("Erro ao buscar os sexos.");
            })
    }
    
    getPartesCorpo() {
        this.catService.getPartesCorpo()
            .then( res => {
                this.partesCorpo = Object.keys( res.json() ).sort();
            })
            .catch(error => {
                console.log("Erro ao buscar os sexos.");
            })
    }
    
    getGravidades() {
        this.catService.getGravidades()
            .then( res => {
                this.gravidades = Object.keys( res.json() ).sort();
            })
            .catch(error => {
                console.log("Erro ao buscar os sexos.");
            })
    }
    
    getTipoAcidentes() {
        this.catService.getTipoAcidentes()
            .then( res => {
                this.tipoAcidentes = Object.keys( res.json() ).sort();
            })
            .catch(error => {
                console.log("Erro ao buscar os sexos.");
            })
    }
    
    getTipoCats() {
        this.catService.getTipoCats()
            .then( res => {
                this.tipoCats = Object.keys( res.json() ).sort();
            })
            .catch(error => {
                console.log("Erro ao buscar os sexos.");
            })
    }
    
    ngOnDestroy() {
        this.inscricao.unsubscribe();
    }
    
    setDadosEmpregado() {
        if ( this.cat.getEmpregado() != undefined && this.cat.getEmpregado().getId() > 0 ) {
            this.empregadoService.get( this.cat.getEmpregado().getId() )
                .then(res => {
                    this.cat.setEmpregado(new EmpregadoBuilder().clone(res.json()));
                    this.cat.setNome(this.cat.getEmpregado().getPessoa().getNome());
                    this.cat.setDataNascimento(this.cat.getEmpregado().getPessoa().getDataNascimento());
                    this.cat.setCargo(this.cat.getEmpregado().getCargo().getNome());
                    this.cat.setRegime(this.cat.getEmpregado().getRegime().getNome());
                    this.cat.setCpf(this.cat.getEmpregado().getPessoa().getCpf());
                    this.cat.setSexo(this.cat.getEmpregado().getPessoa().getSexo());
                    this.cat.setGerencia(this.cat.getEmpregado().getGerencia());
                    this.cat.setBase(this.cat.getEmpregado().getBase());
                })
                .catch(error => {
                    console.log("Erro ao retornar o Empregado.");
                })
        }
    }
    
    save() {
        if ( this.cat.getCpf() != undefined )
            this.cat.setCpf(this.cat.getCpf().replace(".","").replace(".","").replace("-", ""));
        super.save( new CatBuilder().clone( this.cat ) );
    }
    
    verifyContratado() {
        if ( this.cat.getContratado() )
            return false;
        else return true;
    }
    
    setContratado( ) {
        this.cat.setEmpregado(new EmpregadoBuilder().initialize(new Empregado()));
        this.cat.setNome('');
        this.cat.setDataNascimento(null);
        this.cat.getDataNascimentoCustomDate().setAppDate(null);
        this.cat.setSexo('');
        this.cat.setGerencia(new GerenciaBuilder().initialize(new Gerencia()));
        this.cat.setCpf('');
        this.cat.setCargo('');
        this.cat.setEmpresa('');
        this.cat.setRegime('');
    }
    
    openModalDiagnostico() {
        this.showModalDiagnostico = true;
    }
    
    selectDiagnostico( diagnostico: Diagnostico ) {
        this.cat.setDiagnostico(diagnostico);
        this.showModalDiagnostico = false; 
    }
    
    cancelarModalDiagnostico() {
        this.showModalDiagnostico = false;
    }
}