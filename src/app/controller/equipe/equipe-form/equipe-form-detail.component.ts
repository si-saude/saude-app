import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GlobalVariable } from './../../../global';
import { Equipe } from './../../../model/equipe';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { EquipeBuilder } from './../equipe.builder';
import { EquipeService } from './../equipe.service';

@Component( {
    selector: 'app-equipe-form-detail',
    templateUrl: './equipe-form-detail.html',
    styleUrls: ['./equipe-form.css', './../../../../assets/css/form-component.css']
} )
export class EquipeFormDetailComponent extends GenericFormComponent implements OnInit { 
    equipe: Equipe;
    
    constructor( private route: ActivatedRoute,
            private equipeService: EquipeService) { 
            super(equipeService);
            
            this.goTo = "equipe";
            this.equipe = new EquipeBuilder().initialize(this.equipe);
        }
    
    ngOnInit() {
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {                
                let id = params['id'];
                this.showPreload = true;

                this.equipeService.get( id )
                    .then( res => {
                        this.showPreload = false;
                        this.equipe = new EquipeBuilder().clone(res.json());
                    } )
                    .catch( error => {
                        this.catchConfiguration( error );
                    } )
            } );
    }
    
}