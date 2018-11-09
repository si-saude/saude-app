import { ItemRefeicao } from './../../model/item-refeicao';
import { NutricaoAlimentoBuilder } from './../nutricao-alimento/nutricao-alimento.builder';
import { MedidaAlimentarBuilder } from './../medida-alimentar/medida-alimentar.builder';
import { RefeicaoBuilder } from './../refeicao/refeicao.builder';
import { GenericBuilder } from './../../generics/generic.builder';

export class ItemRefeicaoBuilder extends GenericBuilder{
    
    initialize(itemRefeicao: ItemRefeicao): ItemRefeicao {
        itemRefeicao = new ItemRefeicao();
        itemRefeicao.setAlimento(new NutricaoAlimentoBuilder().initialize(null));
        itemRefeicao.setMedidaCaseira(new MedidaAlimentarBuilder().initialize(null));
        itemRefeicao.setRefeicao(new RefeicaoBuilder().initialize(null) );
        
        return itemRefeicao;
    }
    
    initializeList(itemRefeicoes: Array<ItemRefeicao>) {
        
        let array:Array<ItemRefeicao> = new Array<ItemRefeicao>();
        
        if(itemRefeicoes === null || itemRefeicoes === undefined)
            itemRefeicoes = new Array<ItemRefeicao>();
        
        for (let itemRefeicao of itemRefeicoes) {
            array.push(this.initialize(itemRefeicao));
        }
        
        return array;
    }
    
    clone(itemRefeicao: ItemRefeicao): ItemRefeicao {        
        let cloneItemRefeicao = new ItemRefeicao();
        
        if (itemRefeicao === null || itemRefeicao === undefined)
            itemRefeicao = new ItemRefeicao();
        
        cloneItemRefeicao.setId(this.getValue(itemRefeicao, "getId"));
        cloneItemRefeicao.setVersion(this.getValue(itemRefeicao, "getVersion"));
        cloneItemRefeicao.setNe(this.getValue(itemRefeicao, "getNe"));
        cloneItemRefeicao.setVe(this.getValue(itemRefeicao, "getVe"));
        cloneItemRefeicao.setQuantidade(this.getValue(itemRefeicao, "getQuantidade"));
        
        if ( this.getValue(itemRefeicao, "getAlimento") != undefined )
            cloneItemRefeicao.setAlimento(
                    new NutricaoAlimentoBuilder().clone(this.getValue(itemRefeicao, "getAlimento")));
        
        if ( this.getValue(itemRefeicao, "getMedidaCaseira") != undefined )
            cloneItemRefeicao.setMedidaCaseira(
                    new MedidaAlimentarBuilder().clone(this.getValue(itemRefeicao, "getMedidaCaseira")));
        
        if ( this.getValue(itemRefeicao, "getRefeicao") != undefined )
            cloneItemRefeicao.setRefeicao(
                    new RefeicaoBuilder().clone(this.getValue(itemRefeicao, "getRefeicao")));
        
        return cloneItemRefeicao;
    }
    
    cloneList(itemRefeicoes: Array<ItemRefeicao>){
        
        if(itemRefeicoes === null || itemRefeicoes === undefined)
            itemRefeicoes = new Array<ItemRefeicao>();
        
        let array:Array<ItemRefeicao> = new Array<ItemRefeicao>();
    
        for (let itemRefeicao of itemRefeicoes) {
            array.push(this.clone(itemRefeicao));
        }
    
        return array;
    }
    
}
