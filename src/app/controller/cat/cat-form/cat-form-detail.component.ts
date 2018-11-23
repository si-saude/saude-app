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
import { DiagnosticoFilter } from './../../diagnostico/diagnostico.filter';
import { GenericFormComponent } from './../../../generics/generic.form.component';

@Component( {
    selector: 'app-cat-form-detail',
    templateUrl: './cat-form-detail.html',
    styleUrls: ['./cat-form.css', './../../../../assets/css/form-component.css']
} )
export class CatFormDetailComponent extends GenericFormComponent implements OnInit {
    private cat: Cat;
    private cargos: Array<Cargo>;
    private escolaridades: Array<string>;
    private estadosCivis: Array<string>;
    private vinculos: Array<string>;
    private funcoes: Array<Funcao>;
    private classificacoes: Array<ClassificacaoAfastamento>;
    private nexoCausais: Array<string>;
    
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
        this.funcoes = new FuncaoBuilder().initializeList( this.funcoes );
        this.classificacoes = new ClassificacaoAfastamentoBuilder().initializeList(this.classificacoes);
        this.nexoCausais = new Array<string>();
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