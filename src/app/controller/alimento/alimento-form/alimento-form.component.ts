import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { GlobalVariable } from './../../../global';
import { Alimento } from './../../../model/alimento';
import { ItemRefeicaoBuilder } from './../../item-refeicao/item-refeicao.builder';
import { ItemRefeicao } from './../../../model/item-refeicao';
import { MedidaAlimentar } from './../../../model/medida-alimentar';
import { MedidaAlimentarBuilder } from './../../medida-alimentar/medida-alimentar.builder';
import { AlimentoMedidaAlimentar } from './../../../model/alimento-medida-alimentar';
import { AlimentoMedidaAlimentarBuilder } from './../../alimento-medida-alimentar/alimento-medida-alimentar.builder';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { AlimentoBuilder } from './../alimento.builder';
import { AlimentoService } from './../alimento.service';
import { MedidaAlimentarDescricaoAutocomplete } from './../../medida-alimentar/medida-alimentar-descricao.autocomplete';
import { AlimentoNomeAutocomplete } from './../../alimento/alimento-nome.autocomplete';

@Component( {
    selector: 'app-alimento-form',
    templateUrl: './alimento-form.html',
    styleUrls: ['./alimento-form.css', './../../../../assets/css/form-component.css']
} )
export class AlimentoFormComponent extends GenericFormComponent implements OnInit {
    private alimento: Alimento;
    private itemRefeicao: ItemRefeicao;;
    private tipos: Array<string>;
    private tiposCarboidratos: Array<string>;
    private medidaAlimentarAutocomplete: MedidaAlimentarDescricaoAutocomplete;
    private alimentoMedidaAlimentar: AlimentoMedidaAlimentar;
    private alimentoAutocomplete: AlimentoNomeAutocomplete;

    constructor( private route: ActivatedRoute,
        private alimentoService: AlimentoService,
        router: Router) {
        super( alimentoService, router );

        this.goTo = "alimento";
        this.alimento = new AlimentoBuilder().initialize( this.alimento );
        this.itemRefeicao = new ItemRefeicaoBuilder().initialize( this.itemRefeicao );
        this.tipos = new Array<string>();
        this.tiposCarboidratos = new Array<string>();
        this.medidaAlimentarAutocomplete = new MedidaAlimentarDescricaoAutocomplete(
                this.alimentoService.getMedidaAlimentarService());
        this.alimentoMedidaAlimentar = new AlimentoMedidaAlimentarBuilder().initialize(null);
        this.alimentoAutocomplete = new AlimentoNomeAutocomplete(this.alimentoService);
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
                            this.alimento = new AlimentoBuilder().clone( res.json() );
                        } )
                        .catch( error => {
                            this.catchConfiguration( error );
                        } )
                }
            } );
        
        this.getTipos();
        this.getTiposCarboidratos();
    }
    
    getTipos() {
        this.alimentoService.getTipos()
            .then(res => {
                this.tipos = Object.keys( res.json() ).sort();
            })
            .catch(error => {
                this.catchConfiguration(error);
            })
    }
    
    getTiposCarboidratos() {
        this.alimentoService.getTiposCarboidratos()
            .then(res => {
                this.tiposCarboidratos = Object.keys( res.json() ).sort();
            })
            .catch(error => {
                this.catchConfiguration(error);
            })
    }
    ngOnDestroy() {
        this.inscricao.unsubscribe();
    }
    addAlimento(){
        
        if(this.itemRefeicao.getAlimento().getId() > 0 && 
            this.itemRefeicao.getAlimento().getId() != this.alimento.getId() &&
           (this.alimento.getSubstituicoes().find(s=>s.getId() == this.itemRefeicao.getAlimento().getId()) == undefined)){
            this.alimento.getSubstituicoes().push(this.itemRefeicao.getAlimento())
            this.itemRefeicao = new ItemRefeicaoBuilder().initialize(null);
        }
            
        
    }
    removeAlimento(i: number) {
        this.alimento.getSubstituicoes().splice(i, 1);
    }
    
    save() {
        super.save( new AlimentoBuilder().clone( this.alimento ) );
    }
    
    addAlimentoMedidaAlimentar() {
        if ( this.alimentoMedidaAlimentar.getMedidaAlimentar().getDescricao() == undefined ||
                this.alimentoMedidaAlimentar.getMedidaAlimentar().getDescricao() == '' ||
                this.alimentoMedidaAlimentar.getQuantidade() == 0 ||
                this.alimentoMedidaAlimentar.getQuantidade() == undefined) {
            this.callToast('Por favor, preencha todos os campos da Medida Caseira.', 4000);
            return;
        }
        this.alimento.getAlimentoMedidaAlimentares().push(this.alimentoMedidaAlimentar);
        this.alimentoMedidaAlimentar = new AlimentoMedidaAlimentarBuilder().initialize(null);
    }
    
    removeAlimentoMedidaAlimentares(index) {
        this.alimento.getAlimentoMedidaAlimentares().splice(index, 1);
    }
}