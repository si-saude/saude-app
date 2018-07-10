import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { GlobalVariable } from './../../../global';
import { ParteCorpoAtingida } from './../../../model/parte-corpo-atingida';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { ParteCorpoAtingidaBuilder } from './../parte-corpo-atingida.builder';
import { ParteCorpoAtingidaService } from './../parte-corpo-atingida.service';

@Component( {
    selector: 'app-parte-corpo-atingida-form',
    templateUrl: './parte-corpo-atingida-form.html',
    styleUrls: ['./parte-corpo-atingida-form.css', './../../../../assets/css/form-component.css']
} )
export class ParteCorpoAtingidaFormComponent extends GenericFormComponent implements OnInit {
    private parteCorpoAtingida: ParteCorpoAtingida;
    
    constructor( private route: ActivatedRoute,
        private parteCorpoAtingidaService: ParteCorpoAtingidaService,
        router: Router) {
        super( parteCorpoAtingidaService, router );

        this.goTo = "parte-corpo-atingida";
        this.parteCorpoAtingida = new ParteCorpoAtingidaBuilder().initialize( this.parteCorpoAtingida );
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
                            this.parteCorpoAtingida = new ParteCorpoAtingidaBuilder().clone( res.json() );
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
        super.save( new ParteCorpoAtingidaBuilder().clone( this.parteCorpoAtingida ) );
    }
}