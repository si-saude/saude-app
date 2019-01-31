import { Component, Input, OnInit } from '@angular/core';
import { MaterializeAction } from "angular2-materialize";
import { ItemRefeicaoPlano } from './../../model/item-refeicao-plano';
import { ItemRefeicaoPlanoBuilder } from './../../controller/item-refeicao-plano/item-refeicao-plano.builder';
import { AlimentoNomeAutocomplete } from './../../controller/alimento/alimento-nome.autocomplete';
import { MedidaAlimentarDescricaoAutocomplete } from './../../controller/medida-alimentar/medida-alimentar-descricao.autocomplete';
import { MedidaAlimentarBuilder } from './../../controller/medida-alimentar/medida-alimentar.builder';
import { MedidaAlimentar } from './../../model/medida-alimentar';
import { Util } from './../../generics/utils/util';

@Component( {
    selector: 'app-item-refeicao-plano',
    templateUrl: './item-refeicao-plano.html',
    styleUrls: ['./item-refeicao-plano.css']
} )
export class ItemRefeicaoPlanoComponent {
    @Input()  itemRefeicao: ItemRefeicaoPlano;
    @Input()  alimentoAutocomplete: AlimentoNomeAutocomplete;
    @Input()  medidaAutocomplete: MedidaAlimentarDescricaoAutocomplete;
    private medidasCaseiras: Array<MedidaAlimentar>;
    
    calculeVe() {
        if ( this.itemRefeicao.getMedidaCaseira() != undefined &&
                this.itemRefeicao.getMedidaCaseira().getId() > 0 &&
                this.itemRefeicao.getAlimento().getId() > 0 && 
                this.itemRefeicao.getAlimento().getEnergia() != undefined &&
                this.itemRefeicao.getQuantidade() != undefined ) {
            
            let energia = Number(this.itemRefeicao.getAlimento().getEnergia().toString().replace(/\./g,'').replace(',','.'));
            let padrao =  Number(this.itemRefeicao.getAlimento().getPadrao().toString().replace(/\./g,'').replace(',','.'));
            let irQuantidade =  Number(this.itemRefeicao.getQuantidade().toString().replace(/\./g,'').replace(',','.'));
            let amaQuantidade = Number(this.itemRefeicao.getAlimento().getAlimentoMedidaAlimentares().find( 
                    a => a.getMedidaAlimentar().getId() == this.itemRefeicao.getMedidaCaseira().getId() )
                    .getQuantidade().toString().replace(/\./g,'').replace(',','.'));
            
            this.itemRefeicao.setVe( irQuantidade*((amaQuantidade*energia)/padrao));
        }
    }

}