import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { GlobalVariable } from './../../../global';
import { FonteGeradora } from './../../../model/fonte-geradora';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { FonteGeradoraBuilder } from './../fonte-geradora.builder';
import { FonteGeradoraService } from './../fonte-geradora.service'; 


@Component({
  selector: 'app-fonte-geradora-form-detail-form',
  templateUrl: './fonte-geradora-form-detail.html',
  styleUrls: ['./fonte-geradora-form.css', './../../../../assets/css/form-component.css']
})
export class FonteGeradoraFormDetailComponent extends GenericFormComponent implements OnInit {
    private fonteGeradora: FonteGeradora;

    constructor( private route: ActivatedRoute,
        private fonteGeradoraService: FonteGeradoraService,
        router: Router) {
        super( fonteGeradoraService, router );
        this.goTo = "fonte-geradora";
        this.fonteGeradora = new FonteGeradoraBuilder().initialize( this.fonteGeradora );
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
                            this.fonteGeradora = new FonteGeradoraBuilder().clone( res.json() );
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
