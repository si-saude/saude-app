import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { GlobalVariable } from './../../../global';
import { AgenteRisco } from './../../../model/agente-risco';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { AgenteRiscoBuilder } from './../agente-risco.builder';
import { AgenteRiscoService } from './../agente-risco.service';

@Component( {
    selector: 'app-agente-risco-form-detail',
    templateUrl: './agente-risco-form-detail.html',
    styleUrls: ['./agente-risco-form.css', './../../../../assets/css/form-component.css']
} )
export class AgenteRiscoFormDetailComponent extends GenericFormComponent implements OnInit {
    private agenteRisco: AgenteRisco;

    constructor( private route: ActivatedRoute,
        private agenteRiscoService: AgenteRiscoService,
        router: Router) {
        super( agenteRiscoService, router );

        this.goTo = "agente-risco";
        this.agenteRisco = new AgenteRiscoBuilder().initialize( this.agenteRisco );
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
                            this.agenteRisco = new AgenteRiscoBuilder().clone( res.json() );
                        } )
                        .catch( error => {
                            this.catchConfiguration( error );
                        } )
                }
            } );
        
        
    }
    

    ngOnDestroy() {
        this.inscricao.unsubscribe();
    }    
}