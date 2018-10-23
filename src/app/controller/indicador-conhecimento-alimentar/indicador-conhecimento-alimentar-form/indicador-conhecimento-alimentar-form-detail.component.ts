import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { GlobalVariable } from './../../../global';
import { IndicadorConhecimentoAlimentar } from './../../../model/indicador-conhecimento-alimentar';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { IndicadorConhecimentoAlimentarBuilder } from './../indicador-conhecimento-alimentar.builder';
import { IndicadorConhecimentoAlimentarService } from './../indicador-conhecimento-alimentar.service';

@Component( {
    selector: 'app-indicador-conhecimento-alimentar-form-detail',
    templateUrl: './indicador-conhecimento-alimentar-form-detail.html',
    styleUrls: ['./indicador-conhecimento-alimentar-form.css', './../../../../assets/css/form-component.css']
} )
export class IndicadorConhecimentoAlimentarFormDetailComponent extends GenericFormComponent implements OnInit {
    indicadorConhecimentoAlimentar: IndicadorConhecimentoAlimentar;

    constructor( private route: ActivatedRoute,
        private indicadorConhecimentoAlimentarService: IndicadorConhecimentoAlimentarService,
        router: Router) {
        super( indicadorConhecimentoAlimentarService, router );

        this.goTo = "indicador-conhecimento-alimentar";
        this.indicadorConhecimentoAlimentar = new IndicadorConhecimentoAlimentarBuilder().initialize( this.indicadorConhecimentoAlimentar );
    }

    ngOnInit() {
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                let id = params['id'];
                this.showPreload = true;

                this.service.get( id )
                    .then( res => {
                        this.showPreload = false;
                        this.indicadorConhecimentoAlimentar = new IndicadorConhecimentoAlimentarBuilder().clone( res.json() );
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