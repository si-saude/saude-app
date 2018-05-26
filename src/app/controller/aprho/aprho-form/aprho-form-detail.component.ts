import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { GlobalVariable } from './../../../global';
import { Aprho } from './../../../model/aprho';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { AprhoBuilder } from './../aprho.builder';
import { AprhoService } from './../aprho.service';

@Component( {
    selector: 'app-aprho-form-detail',
    templateUrl: './aprho-form-detail.html',
    styleUrls: ['./aprho-form.css', './../../../../assets/css/form-component.css']
} )
export class AprhoFormDetailComponent extends GenericFormComponent implements OnInit {
    aprho: Aprho;

    constructor( private route: ActivatedRoute,
        private aprhoService: AprhoService,
        router: Router) {
        super( aprhoService, router );

        this.goTo = "aprho";
        this.aprho = new AprhoBuilder().initialize( this.aprho );
    }

    ngOnInit() {
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                let id = params['id'];
                this.showPreload = true;

                this.service.get( id )
                    .then( res => {
                        this.showPreload = false;
                        this.aprho = new AprhoBuilder().clone( res.json() );
                    } )
                    .catch( error => {
                        this.catchConfiguration( error );
                    } )
            } );
    }

    ngOnDestroy() {
        this.inscricao.unsubscribe();
    }

}