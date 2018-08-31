import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { GlobalVariable } from './../../../global';
import { MotivoRecusaAtestado } from './../../../model/motivo-recusa-atestado';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { MotivoRecusaAtestadoBuilder } from './../motivo-recusa-atestado.builder';
import { MotivoRecusaAtestadoService } from './../motivo-recusa-atestado.service';

@Component( {
    selector: 'app-motivo-recusa-atestado-form-detail',
    templateUrl: './motivo-recusa-atestado-form-detail.html',
    styleUrls: ['./motivo-recusa-atestado-form.css', './../../../../assets/css/form-component.css']
} )
export class MotivoRecusaAtestadoFormDetailComponent extends GenericFormComponent implements OnInit {
    private motivoRecusaAtestado: MotivoRecusaAtestado;
    
    constructor( private route: ActivatedRoute,
        private motivoRecusaAtestadoService: MotivoRecusaAtestadoService,
        router: Router) {
        super( motivoRecusaAtestadoService, router );

        this.goTo = "motivo-recusa-atestado";
        this.motivoRecusaAtestado = new MotivoRecusaAtestadoBuilder().initialize( this.motivoRecusaAtestado );
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
                            this.motivoRecusaAtestado = new MotivoRecusaAtestadoBuilder().clone( res.json() );
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
        super.save( new MotivoRecusaAtestadoBuilder().clone( this.motivoRecusaAtestado ) );
    }
}