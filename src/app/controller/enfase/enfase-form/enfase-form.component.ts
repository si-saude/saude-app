import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { GlobalVariable } from './../../../global';
import { Enfase } from './../../../model/enfase';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { EnfaseBuilder } from './../enfase.builder';
import { EnfaseService } from './../enfase.service';

@Component( {
    selector: 'app-enfase-form',
    templateUrl: './enfase-form.html',
    styleUrls: ['./enfase-form.css', './../../../../assets/css/form-component.css']
} )
export class EnfaseFormComponent extends GenericFormComponent implements OnInit {
    private enfase: Enfase;
    
    constructor( private route: ActivatedRoute,
        private enfaseService: EnfaseService,
        router: Router) {
        super( enfaseService, router );

        this.goTo = "enfase";
        this.enfase = new EnfaseBuilder().initialize( this.enfase );
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
                            this.enfase = new EnfaseBuilder().clone( res.json() );
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
    
    save() {
        super.save( new EnfaseBuilder().clone( this.enfase ) );
    }
}