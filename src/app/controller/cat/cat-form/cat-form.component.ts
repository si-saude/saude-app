import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import * as $ from 'jquery';

import { GlobalVariable } from './../../../global';
import { Diagnostico } from './../../../model/diagnostico';
import { Cat } from './../../../model/cat';
import { Empregado } from './../../../model/empregado';
import { CatBuilder } from './../cat.builder';
import { CatService } from './../cat.service';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { GerenciaCodigoCompletoAutocomplete } from './../../gerencia/gerencia-codigo-completo.autocomplete';
import { GerenciaService } from './../../gerencia/gerencia.service';
import { EmpregadoNomeAutocomplete } from './../../empregado/empregado-nome.autocomplete';
import { FornecedorRazaoSocialAutocomplete } from './../../fornecedor/fornecedor-razao-social.autocomplete';
import { FornecedorService } from './../../fornecedor/fornecedor.service';
import { EmpregadoService } from './../../empregado/empregado.service';
import { EmpregadoBuilder } from './../../empregado/empregado.builder';

@Component( {
    selector: 'app-cat-form',
    templateUrl: './cat-form.html',
    styleUrls: ['./cat-form.css', './../../../../assets/css/form-component.css']
} )
export class CatFormComponent extends GenericFormComponent implements OnInit {
    private cat: Cat;
    private ufs: Array<string>;
    private sexos: Array<string>;
    private partesCorpo: Array<string>;
    private gravidades: Array<string>;
    private tipoAcidentes: Array<string>;
    private tipoCats: Array<string>;
    private showModalDiagnostico: boolean;
    private innerIdEquipe: number = 0;

    private autoCompleteGerencia: GerenciaCodigoCompletoAutocomplete;
    private autoCompleteEmpregado: EmpregadoNomeAutocomplete;
    private autoCompleteEmpresa: FornecedorRazaoSocialAutocomplete

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
        this.sexos = new Array<string>();
        this.partesCorpo = new Array<string>();
        this.gravidades = new Array<string>();
        this.tipoAcidentes = new Array<string>();
        this.tipoCats = new Array<string>();
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
    
    setDataEmpregado() {
        if ( this.cat.getEmpregado() != undefined ) {
            this.cat.setNome(this.cat.getEmpregado().getPessoa().getNome());
            this.cat.setDataNascimento(this.cat.getEmpregado().getPessoa().getDataNascimento());
            this.cat.setCargo(this.cat.getEmpregado().getCargo().getNome());
            this.cat.setRegime(this.cat.getEmpregado().getRegime().getNome());
            this.cat.setCpf(this.cat.getEmpregado().getPessoa().getCpf());
            this.cat.setSexo(this.cat.getEmpregado().getPessoa().getSexo());
        }
    }
    
    save() {
        this.cat.setCpf(this.cat.getCpf().replace(".","").replace(".","").replace("-", ""));
        super.save( new CatBuilder().clone( this.cat ) );
    }
    
    verifyContratado() {
        if ( this.cat.getContratado() )
            return false;
        else return true;
    }
    
    setContratado( evento ) {
        if ( $("#contratado").is(":checked") )
            this.cat.setEmpregado(new EmpregadoBuilder().initialize(new Empregado()));
        else {
            this.cat.setNome('');
            this.cat.setDataNascimento(undefined);
            this.cat.setSexo('');
            this.cat.setCpf('');
            this.cat.setCargo('');
            this.cat.setEmpresa('');
            this.cat.setRegime('');
        } 
            
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