import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { GlobalVariable } from './../../../global';
import { AtividadeFisica } from './../../../model/atividade-fisica';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { AtividadeFisicaBuilder } from './../atividade-fisica.builder';
import { AtividadeFisicaService } from './../atividade-fisica.service';

@Component( {
    selector: 'app-atividade-fisica-form-detail',
    templateUrl: './atividade-fisica-form-detail.html',
    styleUrls: ['./atividade-fisica-form.css', './../../../../assets/css/form-component.css']
} )
export class AtividadeFisicaFormDetailComponent extends GenericFormComponent implements OnInit {
    private atividadeFisica: AtividadeFisica;
    
    constructor( private route: ActivatedRoute,
        private atividadeFisicaService: AtividadeFisicaService,
        router: Router) {
        super( atividadeFisicaService, router );

        this.goTo = "atividade-fisica";
        this.atividadeFisica = new AtividadeFisicaBuilder().initialize( this.atividadeFisica );
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
                            this.atividadeFisica = new AtividadeFisicaBuilder().clone( res.json() );
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
        super.save( new AtividadeFisicaBuilder().clone( this.atividadeFisica ) );
    }
}