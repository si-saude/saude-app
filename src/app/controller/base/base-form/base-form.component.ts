import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { GlobalVariable } from './../../../global';
import { Base } from './../../../model/base';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { BaseBuilder } from './../base.builder';
import { BaseService } from './../base.service';

@Component( {
    selector: 'app-base-form',
    templateUrl: './base-form.html',
    styleUrls: ['./base-form.css', './../../../../assets/css/form-component.css']
} )
export class BaseFormComponent extends GenericFormComponent implements OnInit {
    private base: Base;
    private ufs: Array<string>;

    constructor( private route: ActivatedRoute,
        private baseService: BaseService,
        router: Router) {
        super( baseService, router );

        this.goTo = "base";
        this.base = new BaseBuilder().initialize( this.base );
        this.ufs = new Array<string>();
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
                            this.base = new BaseBuilder().clone( res.json() );
                        } )
                        .catch( error => {
                            this.catchConfiguration( error );
                        } )
                }
            } );
        
        this.getUfs();
    }
    
    getUfs() {
        this.baseService.getUfs()
            .then(res => {
                this.ufs = Object.keys( res.json() ).sort();
            })
            .catch(error => {
                console.log("Erro ao retornar ufs.");
            })
    }

    ngOnDestroy() {
        this.inscricao.unsubscribe();
    }
    
    save() {
        super.save( new BaseBuilder().clone( this.base ) );
    }
}