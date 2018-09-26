import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { GlobalVariable } from './../../../global';
import { Empresa } from './../../../model/empresa';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { EmpresaBuilder } from './../empresa.builder';
import { EmpresaService } from './../empresa.service';

@Component( {
    selector: 'app-empresa-form-detail',
    templateUrl: './empresa-form-detail.html',
    styleUrls: ['./empresa-form.css', './../../../../assets/css/form-component.css']
} )
export class EmpresaFormDetailComponent extends GenericFormComponent implements OnInit {
    empresa: Empresa;

    constructor( private route: ActivatedRoute,
        private empresaService: EmpresaService,
        router: Router) {
        super( empresaService, router );

        this.goTo = "empresa";
        this.empresa = new EmpresaBuilder().initialize( this.empresa );
    }

    ngOnInit() {
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                let id = params['id'];
                this.showPreload = true;

                this.service.get( id )
                    .then( res => {
                        this.showPreload = false;
                        this.empresa = new EmpresaBuilder().clone( res.json() );
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