import { Component, Input, OnInit } from '@angular/core';
import { MaterializeAction } from "angular2-materialize";
import { ItemRefeicao } from './../../model/item-refeicao';
import { ItemRefeicaoBuilder } from './../../controller/item-refeicao/item-refeicao.builder';
import { AlimentoNomeAutocomplete } from './../../controller/alimento/alimento-nome.autocomplete';
import { MedidaAlimentarDescricaoAutocomplete } from './../../controller/medida-alimentar/medida-alimentar-descricao.autocomplete';
import { MedidaAlimentarBuilder } from './../../controller/medida-alimentar/medida-alimentar.builder';
import { MedidaAlimentar } from './../../model/medida-alimentar';
import { Util } from './../../generics/utils/util';

@Component( {
    selector: 'app-item-refeicao',
    templateUrl: './item-refeicao.html',
    styleUrls: ['./item-refeicao.css']
} )
export class ItemRefeicaoComponent {
    @Input()  itemRefeicao: ItemRefeicao;
    @Input()  alimentoAutocomplete: AlimentoNomeAutocomplete;
    @Input()  medidaAutocomplete: MedidaAlimentarDescricaoAutocomplete;
    private medidasCaseiras: Array<MedidaAlimentar>;
    
    calculeVe() {
        if ( this.itemRefeicao.getMedidaCaseira() != undefined &&
                this.itemRefeicao.getMedidaCaseira().getId() > 0 &&
                this.itemRefeicao.getAlimento().getId() > 0 && 
                this.itemRefeicao.getAlimento().getEnergia() != undefined &&
                this.itemRefeicao.getQuantidade() != undefined ) {
            
            let x = Number(this.itemRefeicao.getAlimento().getEnergia().toString().replace(/\./g,'').replace(',','.')) / 
                        Number(this.itemRefeicao.getAlimento().getPadrao().toString().replace(/\./g,'').replace(',','.'));
            let val = Math.round(x) * 
                        Number(this.itemRefeicao.getAlimento().getAlimentoMedidaAlimentares().find( 
                                a => a.getMedidaAlimentar().getId() == this.itemRefeicao.getMedidaCaseira().getId() )
                                .getQuantidade().toString().replace(/\./g,'').replace(',','.'));
            this.itemRefeicao.setVe( Math.round( Number(val) * 
                    Number(this.itemRefeicao.getQuantidade().toString().replace(/\./g,'').replace(',','.')) ) );
        }
    }

}