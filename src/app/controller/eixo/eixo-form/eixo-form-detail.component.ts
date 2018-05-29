import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { GlobalVariable } from './../../../global';
import { Eixo } from './../../../model/eixo';
import { EixoBuilder } from './../eixo.builder';
import { EixoService } from './../eixo.service';
import { Equipe } from './../../../model/equipe';
import { EquipeBuilder } from './../../equipe/equipe.builder';
import { GenericFormComponent } from './../../../generics/generic.form.component';

@Component( {
    selector: 'app-eixo-form-detail',
    templateUrl: './eixo-form-detail.html',
    styleUrls: ['./../../../../assets/css/form-component.css', './eixo-form.css']
} )
export class EixoFormDetailComponent extends GenericFormComponent implements OnInit { 
    eixo: Eixo;
    equipes: Array<Equipe>;
    
    constructor( private route: ActivatedRoute,
            private eixoService: EixoService,
            router: Router) { 
            super(eixoService, router);
            
            this.goTo = "eixo";
            this.eixo = new EixoBuilder().initialize(this.eixo);
        }
    
    ngOnInit() {
        
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                if( params['id'] !== undefined ) {
                    let id = params['id'];
                    this.showPreload = true;

                    this.eixoService.get( id )
                        .then( res => {
                            this.showPreload = false;
                            this.eixo = new EixoBuilder().clone(res.json());
                        } )
                        .catch( error => {
                            this.catchConfiguration( error );
                        } )
                }
            } );
        
        this.getEquipes();
    }
    
    getEquipes(){
        this.eixoService.getEquipes()
        .then(res => {
            this.equipes = new EquipeBuilder().cloneList(res.json());
        })
        .catch(error => {
            console.log(error);
        });
    }
}