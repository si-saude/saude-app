import { Component, OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { MaterializeDirective,MaterializeAction } from "angular2-materialize";

import { GlobalVariable } from './../../../global';
import { RegraAtendimento } from './../../../model/regra-atendimento';
import { Equipe } from './../../../model/equipe';
import { EquipeBuilder } from './../../equipe/equipe.builder';
import { RegraAtendimentoEquipe } from './../../../model/regra-atendimento-equipe';
import { RegraAtendimentoEquipeBuilder } from './../../regra-atendimento-equipe/regra-atendimento-equipe.builder';
import { RegraAtendimentoEquipeRequisito } from './../../../model/regra-atendimento-equipe-requisito';
import { RegraAtendimentoEquipeRequisitoBuilder } from './../../regra-atendimento-equipe-requisito/regra-atendimento-equipe-requisito.builder';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { RegraAtendimentoBuilder } from './../regra-atendimento.builder';
import { RegraAtendimentoService } from './../regra-atendimento.service';

@Component( {
    selector: 'app-regra-atendimento-form-detail',
    templateUrl: './regra-atendimento-form-detail.html',
    styleUrls: ['./regra-atendimento-form.css', './../../../../assets/css/form-component.css']
} )
export class RegraAtendimentoFormDetailComponent extends GenericFormComponent implements OnInit {
    regraAtendimento: RegraAtendimento;
    equipes: Array<Equipe>;
    requisitos: Array<RegraAtendimentoEquipeRequisito>;
    arrayRequisito: Array<RegraAtendimentoEquipeRequisito>;
    regraAtendimentoEquipes: Array<RegraAtendimentoEquipe>;
    
    globalActions = new EventEmitter<string|MaterializeAction>();
    toastParams = ['', 4000];

    selectedEqp = null;
    
    constructor( private route: ActivatedRoute,
            private regraAtendimentoService: RegraAtendimentoService,
            router: Router) { 
            super(regraAtendimentoService, router);
            this.goTo = "regra-atendimento";
            
            this.arrayRequisito = new Array<RegraAtendimentoEquipeRequisito>();
            this.requisitos = new Array<RegraAtendimentoEquipeRequisito>();
            this.regraAtendimentoEquipes = new Array<RegraAtendimentoEquipe>();
            this.regraAtendimento = new RegraAtendimentoBuilder().initialize(this.regraAtendimento);
        }
    
    ngOnInit() {
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                if( params['id'] !== undefined ) {
                    let id = params['id'];
                    this.showPreload = true;

                    this.regraAtendimentoService.get( id )
                        .then( res => {
                            this.showPreload = false;
                            this.regraAtendimento = new RegraAtendimentoBuilder().clone(res.json());
                        } )
                        .catch( error => {
                            this.catchConfiguration( error );
                        } )
                }
            } );
        
        this.getEquipes();
    }
    
    getEquipes() {
        this.regraAtendimentoService.getEquipes()
            .then(res => {
                this.equipes = new EquipeBuilder().cloneList( res.json() );
            })
            .catch(error => {
                console.log(error);
            })
    }
    
    save() {
        super.save(new RegraAtendimentoBuilder().clone(this.regraAtendimento));
    }   
    
    selectEquipe(index: number) {
        this.selectedEqp = this.regraAtendimento.getRegraAtendimentoEquipes()[index].getEquipe();
        this.arrayRequisito = this.regraAtendimento.getRegraAtendimentoEquipes()[index].getRegraAtendimentoEquipeRequisitos();
    }
    
    selectedEquipe(e: number) {
        if ( this.regraAtendimento.getRegraAtendimentoEquipes()[e].getEquipe() === this.selectedEqp ) {
            return "active";
        } else return "";
    }
    
}