import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { GlobalVariable } from './../../../global';
import { NutricaoAlimento } from './../../../model/nutricao-alimento';
import { MedidaAlimentar } from './../../../model/medida-alimentar';
import { MedidaAlimentarBuilder } from './../../medida-alimentar/medida-alimentar.builder';
import { NutricaoAlimentoMedidaAlimentar } from './../../../model/nutricao-alimento-medida-alimentar';
import { NutricaoAlimentoMedidaAlimentarBuilder } from './../../nutricao-alimento-medida-alimentar/nutricao-alimento-medida-alimentar.builder';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { NutricaoAlimentoBuilder } from './../nutricao-alimento.builder';
import { NutricaoAlimentoService } from './../nutricao-alimento.service';
import { MedidaAlimentarDescricaoAutocomplete } from './../../medida-alimentar/medida-alimentar-descricao.autocomplete';

@Component( {
    selector: 'app-nutricao-alimento-form',
    templateUrl: './nutricao-alimento-form.html',
    styleUrls: ['./nutricao-alimento-form.css', './../../../../assets/css/form-component.css']
} )
export class NutricaoAlimentoFormComponent extends GenericFormComponent implements OnInit {
    private nutricaoAlimento: NutricaoAlimento;
    private tipos: Array<string>;
    private medidaAlimentarAutocomplete: MedidaAlimentarDescricaoAutocomplete;
    private nutricaoAlimentoMedidaAlimentar: NutricaoAlimentoMedidaAlimentar;

    constructor( private route: ActivatedRoute,
        private nutricaoAlimentoService: NutricaoAlimentoService,
        router: Router) {
        super( nutricaoAlimentoService, router );

        this.goTo = "nutricao-alimento";
        this.nutricaoAlimento = new NutricaoAlimentoBuilder().initialize( this.nutricaoAlimento );
        this.tipos = new Array<string>();
        this.medidaAlimentarAutocomplete = new MedidaAlimentarDescricaoAutocomplete(
                this.nutricaoAlimentoService.getMedidaAlimentarService());
        this.nutricaoAlimentoMedidaAlimentar = new NutricaoAlimentoMedidaAlimentarBuilder().initialize(null);
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
                            this.nutricaoAlimento = new NutricaoAlimentoBuilder().clone( res.json() );
                        } )
                        .catch( error => {
                            this.catchConfiguration( error );
                        } )
                }
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
    
    save() {
        super.save( new NutricaoAlimentoBuilder().clone( this.nutricaoAlimento ) );
    }
    
    addNutricaoAlimentoMedidaAlimentar() {
        if ( this.nutricaoAlimentoMedidaAlimentar.getMedidaAlimentar().getDescricao() == undefined ||
                this.nutricaoAlimentoMedidaAlimentar.getMedidaAlimentar().getDescricao() == '' ||
                this.nutricaoAlimentoMedidaAlimentar.getQuantidade() == 0 ||
                this.nutricaoAlimentoMedidaAlimentar.getQuantidade() == undefined) {
            this.callToast('Por favor, preencha todos os campos da Medida Caseira.', 4000);
            return;
        }
        this.nutricaoAlimento.getNutricaoAlimentoMedidaAlimentares().push(this.nutricaoAlimentoMedidaAlimentar);
        this.nutricaoAlimentoMedidaAlimentar = new NutricaoAlimentoMedidaAlimentarBuilder().initialize(null);
    }
    
    removeNutricaoAlimentoMedidaAlimentares(index) {
        this.nutricaoAlimento.getNutricaoAlimentoMedidaAlimentares().splice(index, 1);
    }
}