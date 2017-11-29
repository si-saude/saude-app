import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GlobalVariable } from './../../../global';
import { Equipe } from './../../../model/equipe';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { EquipeBuilder } from './../equipe.builder';
import { EquipeService } from './../equipe.service';

@Component( {
    selector: 'app-equipe-form',
    templateUrl: './equipe-form.html',
    styleUrls: ['./equipe-form.css', './../../../../assets/css/form-component.css']
} )
export class EquipeFormComponent extends GenericFormComponent implements OnInit { 
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
                if( params['id'] !== undefined ) {
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
                }
            } );
        
    }
    
    save() {
        super.save(new EquipeBuilder().clone(this.equipe));
    }   
    
    
}