import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { GlobalVariable } from './../../../global';
import { NutricaoAlimento } from './../../../model/nutricao-alimento';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { NutricaoAlimentoBuilder } from './../nutricao-alimento.builder';
import { NutricaoAlimentoService } from './../nutricao-alimento.service';

@Component( {
    selector: 'app-nutricao-alimento-form-detail',
    templateUrl: './nutricao-alimento-form-detail.html',
    styleUrls: ['./nutricao-alimento-form.css', './../../../../assets/css/form-component.css']
} )
export class NutricaoAlimentoFormDetailComponent extends GenericFormComponent implements OnInit {
    nutricaoAlimento: NutricaoAlimento;
    private tipos: Array<string>;

    constructor( private route: ActivatedRoute,
        private nutricaoAlimentoService: NutricaoAlimentoService,
        router: Router) {
        super( nutricaoAlimentoService, router );

        this.goTo = "nutricao-alimento";
        this.nutricaoAlimento = new NutricaoAlimentoBuilder().initialize( this.nutricaoAlimento );
        this.tipos = new Array<string>();
    }

    ngOnInit() {
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                let id = params['id'];
                this.showPreload = true;

                this.service.get( id )
                    .then( res => {
                        this.showPreload = false;
                        this.nutricaoAlimento = new NutricaoAlimentoBuilder().clone( res.json() );
                    } )
                    .catch( error => {
                        this.catchConfiguration( error );
                    } )
            } );
        
        this.getTipos();
    }
    
    getTipos() {
        this.nutricaoAlimentoService.getTipos()
            .then(res => {
                this.tipos = Object.keys( res.json() ).sort();
            })
            .catch(error => {
                this.catchConfiguration(error);
            })
    }

    ngOnDestroy() {
        this.inscricao.unsubscribe();
    }

}