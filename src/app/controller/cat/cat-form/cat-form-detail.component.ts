import { Component, OnInit, ViewChild,EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import * as $ from 'jquery';
import { MaterializeAction } from "angular2-materialize";

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
    selector: 'app-cat-form-detail',
    templateUrl: './cat-form-detail.html',
    styleUrls: ['./cat-form.css', './../../../../assets/css/form-component.css']
} )
export class CatFormDetailComponent extends GenericFormComponent implements OnInit {
    private cat: Cat;
    private ufs: Array<string>;
    private sexos: Array<string>;
    private partesCorpo: Array<string>;
    private gravidades: Array<string>;
    private tipoAcidentes: Array<string>;
    private tipoCats: Array<string>;
    private showModalDiagnostico: boolean;
    private innerIdEquipe: number = 0;
    private diaHoraAcidenteTimeActions;
    
    constructor( private route: ActivatedRoute,
        private catService: CatService,
        router: Router) {
        super( catService, router );

        this.goTo = "cat";
        this.cat = new CatBuilder().initialize( this.cat );
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
    
    save() {
        super.save( new CatBuilder().clone( this.cat ) );
    }
}