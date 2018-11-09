import { Component, Input, OnInit } from '@angular/core';
import { MaterializeAction } from "angular2-materialize";
import { ItemRefeicao } from './../../model/item-refeicao';
import { ItemRefeicaoBuilder } from './../../controller/item-refeicao/item-refeicao.builder';
import { NutricaoAlimentoNomeAutocomplete } from './../../controller/nutricao-alimento/nutricao-alimento-nome.autocomplete';
import { MedidaAlimentarDescricaoAutocomplete } from './../../controller/medida-alimentar/medida-alimentar-descricao.autocomplete';

@Component( {
    selector: 'app-item-refeicao',
    templateUrl: './item-refeicao.html',
    styleUrls: ['./item-refeicao.css']
} )
export class ItemRefeicaoComponent {
    @Input()  itemRefeicao: ItemRefeicao;
    @Input()  alimentoAutocomplete: NutricaoAlimentoNomeAutocomplete;
    @Input()  medidaAutocomplete: MedidaAlimentarDescricaoAutocomplete;
    
    calculeVe() {
        if ( ( this.itemRefeicao.getAlimento().getId() > 0 && 
                this.itemRefeicao.getAlimento().getEnergia() != undefined &&
                this.itemRefeicao.getAlimento().getEnergia() > 0 ) &&
                ( this.itemRefeicao.getQuantidade() != undefined && 
                    this.itemRefeicao.getQuantidade() > 0 ) )
            this.itemRefeicao.setVe(this.itemRefeicao.getAlimento().getEnergia() * this.itemRefeicao.getQuantidade() )
            
    }
}