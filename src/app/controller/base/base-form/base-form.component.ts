import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GlobalVariable } from './../../../global';
import { Base } from './../../../model/base';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { BaseBuilder } from './../base.builder';
import { BaseService } from './../base.service';

@Component( {
    selector: 'app-base-form',
    templateUrl: './base-form.html',
    styleUrls: ['./base-form.css']
} )
export class BaseFormComponent extends GenericFormComponent<Base> implements OnInit { 
    base: Base;
    
    constructor( private route: ActivatedRoute,
            private baseService: BaseService) { 
            super(baseService);
            
            this.goTo = "base";
            this.base = new BaseBuilder().initialize(this.base);
        }
    
    ngOnInit() {
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                if( params['id'] !== undefined ) {
                    let id = params['id'];
                    this.showPreload = true;

                    this.baseService.get( id )
                        .then( res => {
                            this.showPreload = false;
                            this.base = new BaseBuilder().clone(res.json());
                        } )
                        .catch( error => {
                            this.showPreload = false;
                            console.log( error );
                        } )
                }
            } );
        
    }
    
    save() {
        super.save(new BaseBuilder().clone(this.base));
    }   
    
    
}