import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { GlobalVariable } from './../../../global';
import { IndicadorConhecimentoAlimentar } from './../../../model/indicador-conhecimento-alimentar';
import { ItemIndicadorConhecimentoAlimentar } from './../../../model/item-indicador-conhecimento-alimentar';
import { ItemIndicadorConhecimentoAlimentarBuilder } from './../../item-indicador-conhecimento-alimentar/item-indicador-conhecimento-alimentar.builder';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { IndicadorConhecimentoAlimentarBuilder } from './../indicador-conhecimento-alimentar.builder';
import { IndicadorConhecimentoAlimentarService } from './../indicador-conhecimento-alimentar.service';

@Component( {
    selector: 'app-indicador-conhecimento-alimentar-form',
    templateUrl: './indicador-conhecimento-alimentar-form.html',
    styleUrls: ['./indicador-conhecimento-alimentar-form.css', './../../../../assets/css/form-component.css']
} )
export class IndicadorConhecimentoAlimentarFormComponent extends GenericFormComponent implements OnInit {
    private indicadorConhecimentoAlimentar: IndicadorConhecimentoAlimentar;
    private item: ItemIndicadorConhecimentoAlimentar;
    
    constructor( private route: ActivatedRoute,
        private indicadorConhecimentoAlimentarService: IndicadorConhecimentoAlimentarService,
        router: Router) {
        super( indicadorConhecimentoAlimentarService, router );

        this.goTo = "indicador-conhecimento-alimentar";
        this.indicadorConhecimentoAlimentar = new IndicadorConhecimentoAlimentarBuilder().initialize( this.indicadorConhecimentoAlimentar );
        this.item = new ItemIndicadorConhecimentoAlimentar();
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
                            this.indicadorConhecimentoAlimentar = new IndicadorConhecimentoAlimentarBuilder().clone( res.json() );
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
        super.save( new IndicadorConhecimentoAlimentarBuilder().clone( this.indicadorConhecimentoAlimentar ) );
    }
    
    addItem() {
        if ( this.item.getDescricao() == undefined || 
                this.item.getDescricao() == '' ) {
            this.callToast("Por favor, insira uma descri&ccedil;&atilde;o.", 4000);
            return;
        }
        
        this.indicadorConhecimentoAlimentar.getItemIndicadorConhecimentoAlimentares().push(
                new ItemIndicadorConhecimentoAlimentarBuilder().clone(this.item));
        this.item = new ItemIndicadorConhecimentoAlimentar();
    }
    
    removeItem(index) {
        this.indicadorConhecimentoAlimentar.getItemIndicadorConhecimentoAlimentares().splice(index, 1);
    }
}