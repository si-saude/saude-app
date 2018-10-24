import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { GlobalVariable } from './../../../global';
import { Clinica } from './../../../model/clinica';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { ClinicaBuilder } from './../clinica.builder';
import { ClinicaService } from './../clinica.service';

@Component( {
    selector: 'app-clinica-form-detail',
    templateUrl: './clinica-form-detail.html',
    styleUrls: ['./clinica-form.css', './../../../../assets/css/form-component.css']
} )
export class ClinicaFormDetailComponent extends GenericFormComponent implements OnInit {
    clinica: Clinica;

    constructor( private route: ActivatedRoute,
        private clinicaService: ClinicaService,
        router: Router) {
        super( clinicaService, router );

        this.goTo = "clinica";
        this.clinica = new ClinicaBuilder().initialize( this.clinica );
    }

    ngOnInit() {
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                let id = params['id'];
                this.showPreload = true;

                this.service.get( id )
                    .then( res => {
                        this.showPreload = false;
                        this.clinica = new ClinicaBuilder().clone( res.json() );
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