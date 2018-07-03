import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { GlobalVariable } from './../../../global';
import { Cat } from './../../../model/cat';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { CatBuilder } from './../cat.builder';
import { CatService } from './../cat.service';

@Component( {
    selector: 'app-cat-form',
    templateUrl: './cat-form.html',
    styleUrls: ['./cat-form.css', './../../../../assets/css/form-component.css']
} )
export class CatFormComponent extends GenericFormComponent implements OnInit {
    private cat: Cat;
    private ufs: Array<string>;

    constructor( private route: ActivatedRoute,
        private catService: CatService,
        router: Router) {
        super( catService, router );

        this.goTo = "cat";
        this.cat = new CatBuilder().initialize( this.cat );
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
                            this.cat = new CatBuilder().clone( res.json() );
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
        super.save( new CatBuilder().clone( this.cat ) );
    }
}