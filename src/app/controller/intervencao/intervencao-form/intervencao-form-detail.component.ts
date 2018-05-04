import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { GlobalVariable } from './../../../global';
import { Equipe } from './../../../model/equipe';
import { EquipeBuilder } from './../../equipe/equipe.builder';
import { IntervencaoService } from './../intervencao.service';
import { Intervencao } from './../../../model/intervencao';
import { IntervencaoBuilder } from './../intervencao.builder';
import { GenericFormComponent } from './../../../generics/generic.form.component';

@Component( {
    selector: 'app-intervencao-form-detail',
    templateUrl: './intervencao-form-detail.html',
    styleUrls: ['./../../../../assets/css/form-component.css', './intervencao-form.css']
} )
export class IntervencaoFormDetailComponent extends GenericFormComponent implements OnInit { 
    intervencao: Intervencao;
    equipes: Array<Equipe>;
    
    constructor( private route: ActivatedRoute,
            private intervencaoService: IntervencaoService,
            router: Router) { 
            super(intervencaoService, router);
            
            this.goTo = "intervencao";
            this.intervencao = new IntervencaoBuilder().initialize(this.intervencao);
        }
    
    ngOnInit() {
        
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                if( params['id'] !== undefined ) {
                    let id = params['id'];
                    this.showPreload = true;

                    this.intervencaoService.get( id )
                        .then( res => {
                            this.showPreload = false;
                            this.intervencao = new IntervencaoBuilder().clone(res.json());
                        } )
                        .catch( error => {
                            this.catchConfiguration( error );
                        } )
                }
            } );
        
        this.getEquipes();
    }
    
    getEquipes(){
        this.intervencaoService.getEquipes()
        .then(res => {
            this.equipes = new EquipeBuilder().cloneList(res.json());
        })
        .catch(error => {
            console.log(error);
        });
    }
    
}