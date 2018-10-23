import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { GlobalVariable } from './../../../global';
import { MedidaAlimentar } from './../../../model/medida-alimentar';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { MedidaAlimentarBuilder } from './../medida-alimentar.builder';
import { MedidaAlimentarService } from './../medida-alimentar.service';

@Component( {
    selector: 'app-medida-alimentar-form',
    templateUrl: './medida-alimentar-form.html',
    styleUrls: ['./medida-alimentar-form.css', './../../../../assets/css/form-component.css']
} )
export class MedidaAlimentarFormComponent extends GenericFormComponent implements OnInit {
    private medidaAlimentar: MedidaAlimentar;
    
    constructor( private route: ActivatedRoute,
        private medidaAlimentarService: MedidaAlimentarService,
        router: Router) {
        super( medidaAlimentarService, router );

        this.goTo = "medida-alimentar";
        this.medidaAlimentar = new MedidaAlimentarBuilder().initialize( this.medidaAlimentar );
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
                            this.medidaAlimentar = new MedidaAlimentarBuilder().clone( res.json() );
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
        super.save( new MedidaAlimentarBuilder().clone( this.medidaAlimentar ) );
    }
}