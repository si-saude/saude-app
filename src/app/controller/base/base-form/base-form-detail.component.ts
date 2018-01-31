import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { GlobalVariable } from './../../../global';
import { Base } from './../../../model/base';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { BaseBuilder } from './../base.builder';
import { BaseService } from './../base.service';

@Component( {
    selector: 'app-base-form-detail',
    templateUrl: './base-form-detail.html',
    styleUrls: ['./base-form.css', './../../../../assets/css/form-component.css']
} )
export class BaseFormDetailComponent extends GenericFormComponent implements OnInit {
    base: Base;

    constructor( private route: ActivatedRoute,
        private baseService: BaseService,
        router: Router) {
        super( baseService, router );

        this.goTo = "base";
        this.base = new BaseBuilder().initialize( this.base );
    }

    ngOnInit() {
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                let id = params['id'];
                this.showPreload = true;

                this.service.get( id )
                    .then( res => {
                        this.showPreload = false;
                        this.base = new BaseBuilder().clone( res.json() );
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