import { ItemIndicadorConhecimentoAlimentar } from './../../model/item-indicador-conhecimento-alimentar';
import { GenericBuilder } from './../../generics/generic.builder';

export class ItemIndicadorConhecimentoAlimentarBuilder extends GenericBuilder {

    initialize(itemIndicadorConhecimentoAlimentar: ItemIndicadorConhecimentoAlimentar) {
        itemIndicadorConhecimentoAlimentar = new ItemIndicadorConhecimentoAlimentar();
        return itemIndicadorConhecimentoAlimentar;
    }
    
    initializeList(itemIndicadorConhecimentoAlimentares: Array<ItemIndicadorConhecimentoAlimentar>) {
        
        let array:Array<ItemIndicadorConhecimentoAlimentar> = new Array<ItemIndicadorConhecimentoAlimentar>();
        
        if(itemIndicadorConhecimentoAlimentares === null || itemIndicadorConhecimentoAlimentares === undefined)
            itemIndicadorConhecimentoAlimentares = new Array<ItemIndicadorConhecimentoAlimentar>();
        
        for (let itemIndicadorConhecimentoAlimentar of itemIndicadorConhecimentoAlimentares) {
            array.push(this.initialize(itemIndicadorConhecimentoAlimentar));
        }
        
        return array;
    }
    
    clone(itemIndicadorConhecimentoAlimentar: ItemIndicadorConhecimentoAlimentar): ItemIndicadorConhecimentoAlimentar {
        
        if (itemIndicadorConhecimentoAlimentar === null || itemIndicadorConhecimentoAlimentar === undefined)
            itemIndicadorConhecimentoAlimentar = new ItemIndicadorConhecimentoAlimentar();
        
        let cloneItemIndicadorConhecimentoAlimentar = new ItemIndicadorConhecimentoAlimentar();
        cloneItemIndicadorConhecimentoAlimentar.setId(this.getValue(itemIndicadorConhecimentoAlimentar,"getId"));
        cloneItemIndicadorConhecimentoAlimentar.setDescricao(this.getValue(itemIndicadorConhecimentoAlimentar, "getDescricao"));
        cloneItemIndicadorConhecimentoAlimentar.setOrdem(this.getValue(itemIndicadorConhecimentoAlimentar, "getOrdem"));
        cloneItemIndicadorConhecimentoAlimentar.setVersion(this.getValue(itemIndicadorConhecimentoAlimentar, "getVersion"));
        cloneItemIndicadorConhecimentoAlimentar.setCerto(this.getValue(itemIndicadorConhecimentoAlimentar, "getCerto"))
        return cloneItemIndicadorConhecimentoAlimentar;
    }
    
    cloneList(itemIndicadorConhecimentoAlimentares: Array<ItemIndicadorConhecimentoAlimentar>): Array<ItemIndicadorConhecimentoAlimentar> {
        let array:Array<ItemIndicadorConhecimentoAlimentar> = new Array<ItemIndicadorConhecimentoAlimentar>();
        if (itemIndicadorConhecimentoAlimentares !== null && itemIndicadorConhecimentoAlimentares !== undefined) { 
            for (let itemIndicadorConhecimentoAlimentar of itemIndicadorConhecimentoAlimentares) {
                array.push(this.clone(itemIndicadorConhecimentoAlimentar));
            }
        }
        
        return array;
    }
    
}