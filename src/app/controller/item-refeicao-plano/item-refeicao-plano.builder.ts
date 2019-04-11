import { ItemRefeicaoPlano } from './../../model/item-refeicao-plano';
import { AlimentoBuilder } from './../alimento/alimento.builder';
import { MedidaAlimentarBuilder } from './../medida-alimentar/medida-alimentar.builder';
import { RefeicaoPlanoBuilder } from './../refeicao-plano/refeicao-plano.builder';
import { GenericBuilder } from './../../generics/generic.builder';
import { Util } from './../../generics/utils/util';

export class ItemRefeicaoPlanoBuilder extends GenericBuilder{
    
    initialize(itemRefeicao: ItemRefeicaoPlano): ItemRefeicaoPlano {
        itemRefeicao = new ItemRefeicaoPlano();
        itemRefeicao.setAlimento(new AlimentoBuilder().initialize(null));   
        itemRefeicao.setMedidaCaseira(new MedidaAlimentarBuilder().initialize(null));
        itemRefeicao.setRefeicao(new RefeicaoPlanoBuilder().initialize(null) );
        
        return itemRefeicao;
    }
    
    initializeList(itemRefeicoes: Array<ItemRefeicaoPlano>) {
        
        let array:Array<ItemRefeicaoPlano> = new Array<ItemRefeicaoPlano>();
        
        if(itemRefeicoes === null || itemRefeicoes === undefined)
            itemRefeicoes = new Array<ItemRefeicaoPlano>();
        
        for (let itemRefeicao of itemRefeicoes) {
            array.push(this.initialize(itemRefeicao));
        }
        
        return array;
    }
    
    clone(itemRefeicao: ItemRefeicaoPlano): ItemRefeicaoPlano {        
        let cloneItemRefeicaoPlano = new ItemRefeicaoPlano();
        
        if (itemRefeicao === null || itemRefeicao === undefined)
            itemRefeicao = new ItemRefeicaoPlano();
        
        cloneItemRefeicaoPlano.setId(this.getValue(itemRefeicao, "getId"));
        cloneItemRefeicaoPlano.setVersion(this.getValue(itemRefeicao, "getVersion"));
        cloneItemRefeicaoPlano.setVe(this.getValue(itemRefeicao, "getVe"));
        cloneItemRefeicaoPlano.setQuantidade(Util.treatDouble(this.getValue(itemRefeicao, "getQuantidade")));
        cloneItemRefeicaoPlano.setObservacao(this.getValue(itemRefeicao, "getObservacao"));
                
        if ( this.getValue(itemRefeicao, "getAlimento") != undefined )
            cloneItemRefeicaoPlano.setAlimento(
                    new AlimentoBuilder().clone(this.getValue(itemRefeicao, "getAlimento")));
        
        if ( this.getValue(itemRefeicao, "getMedidaCaseira") != undefined )
            cloneItemRefeicaoPlano.setMedidaCaseira(
                    new MedidaAlimentarBuilder().clone(this.getValue(itemRefeicao, "getMedidaCaseira")));
        
        if ( this.getValue(itemRefeicao, "getRefeicao") != undefined )
            cloneItemRefeicaoPlano.setRefeicao(
                    new RefeicaoPlanoBuilder().clone(this.getValue(itemRefeicao, "getRefeicao")));
        
        return cloneItemRefeicaoPlano;
    }
    
    cloneList(itemRefeicoes: Array<ItemRefeicaoPlano>){
        
        if(itemRefeicoes === null || itemRefeicoes === undefined)
            itemRefeicoes = new Array<ItemRefeicaoPlano>();
        
        let array:Array<ItemRefeicaoPlano> = new Array<ItemRefeicaoPlano>();
    
        for (let itemRefeicao of itemRefeicoes) {
            array.push(this.clone(itemRefeicao));
        }
    
        return array;
    }
    
}
