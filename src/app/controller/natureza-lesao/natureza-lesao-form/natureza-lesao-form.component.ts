import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { GlobalVariable } from './../../../global';
import { NaturezaLesao } from './../../../model/natureza-lesao';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { NaturezaLesaoBuilder } from './../natureza-lesao.builder';
import { NaturezaLesaoService } from './../natureza-lesao.service';

@Component( {
    selector: 'app-natureza-lesao-form',
    templateUrl: './natureza-lesao-form.html',
    styleUrls: ['./natureza-lesao-form.css', './../../../../assets/css/form-component.css']
} )
export class NaturezaLesaoFormComponent extends GenericFormComponent implements OnInit {
    private naturezaLesao: NaturezaLesao;
    
    constructor( private route: ActivatedRoute,
        private naturezaLesaoService: NaturezaLesaoService,
        router: Router) {
        super( naturezaLesaoService, router );

        this.goTo = "natureza-lesao";
        this.naturezaLesao = new NaturezaLesaoBuilder().initialize( this.naturezaLesao );
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
                            this.naturezaLesao = new NaturezaLesaoBuilder().clone( res.json() );
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
        super.save( new NaturezaLesaoBuilder().clone( this.naturezaLesao ) );
    }
}