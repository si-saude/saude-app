import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GlobalVariable } from './../../../global';
import { Regime } from './../../../model/regime';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { RegimeBuilder } from './../regime.builder';
import { RegimeService } from './../regime.service';

@Component( {
    selector: 'app-regime-form',
    templateUrl: './regime-form.html',
    styleUrls: ['./regime-form.css']
} )
export class RegimeFormComponent extends GenericFormComponent implements OnInit { 
    regime: Regime;
    
    constructor( private route: ActivatedRoute,
            private regimeService: RegimeService) { 
            super(regimeService);
            this.goTo = "regime";
            
            this.regime = new RegimeBuilder().initialize(this.regime);
        }
    
    ngOnInit() {
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                if( params['id'] !== undefined ) {
                    let id = params['id'];
                    this.showPreload = true;

                    this.regimeService.get( id )
                        .then( res => {
                            this.showPreload = false;
                            this.regime = new RegimeBuilder().clone(res.json());
                        } )
                        .catch( error => {
                            this.catchConfiguration( error );
                        } )
                }
            } );
        
    }
    
    save() {
        super.save(new RegimeBuilder().clone(this.regime));
    }   
    
    
}