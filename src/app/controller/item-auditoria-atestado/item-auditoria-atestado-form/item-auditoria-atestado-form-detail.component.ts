import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { GlobalVariable } from './../../../global';
import { ItemAuditoriaAtestadoService } from './../item-auditoria-atestado.service';
import { ItemAuditoriaAtestado } from './../../../model/item-auditoria-atestado';
import { ItemAuditoriaAtestadoBuilder } from './../item-auditoria-atestado.builder';
import { GenericFormComponent } from './../../../generics/generic.form.component';

@Component( {
    selector: 'app-item-auditoria-atestado-form-detail',
    templateUrl: './item-auditoria-atestado-form-detail.html',
    styleUrls: ['./../../../../assets/css/form-component.css', './item-auditoria-atestado-form.css']
} )
export class ItemAuditoriaAtestadoFormDetailComponent extends GenericFormComponent implements OnInit { 
    itemAuditoriaAtestado: ItemAuditoriaAtestado;
    
    constructor( private route: ActivatedRoute,
            private itemAuditoriaAtestadoService: ItemAuditoriaAtestadoService,
            router: Router) { 
            super(itemAuditoriaAtestadoService, router);
            
            this.goTo = "item-auditoria-atestado";
            this.itemAuditoriaAtestado = new ItemAuditoriaAtestadoBuilder().initialize(this.itemAuditoriaAtestado);
        }
    
    ngOnInit() {
        
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                if( params['id'] !== undefined ) {
                    let id = params['id'];
                    this.showPreload = true;

                    this.itemAuditoriaAtestadoService.get( id )
                        .then( res => {
                            this.showPreload = false;
                            this.itemAuditoriaAtestado = new ItemAuditoriaAtestadoBuilder().clone(res.json());
                        } )
                        .catch( error => {
                            this.catchConfiguration( error );
                        } )
                }
            } );
    }
    
}