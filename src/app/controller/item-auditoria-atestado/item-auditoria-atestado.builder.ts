import { ItemAuditoriaAtestado } from './../../model/item-auditoria-atestado';
import { GenericBuilder } from './../../generics/generic.builder';

export class ItemAuditoriaAtestadoBuilder extends GenericBuilder{
    
    initialize(itemAuditoriaAtestado: ItemAuditoriaAtestado): ItemAuditoriaAtestado {
        itemAuditoriaAtestado = new ItemAuditoriaAtestado();
        
        return itemAuditoriaAtestado;
    }
    
    initializeList(itemAuditoriaAtestados: Array<ItemAuditoriaAtestado>) {
        
        let array:Array<ItemAuditoriaAtestado> = new Array<ItemAuditoriaAtestado>();
        
        if(itemAuditoriaAtestados === null || itemAuditoriaAtestados === undefined)
            itemAuditoriaAtestados = new Array<ItemAuditoriaAtestado>();
        
        for (let itemAuditoriaAtestado of itemAuditoriaAtestados) {
            array.push(this.initialize(itemAuditoriaAtestado));
        }
        
        return array;
    }
    
    clone(itemAuditoriaAtestado: ItemAuditoriaAtestado): ItemAuditoriaAtestado {        
        let cloneItemAuditoriaAtestado = new ItemAuditoriaAtestado();
        
        if (itemAuditoriaAtestado === null || itemAuditoriaAtestado === undefined)
            itemAuditoriaAtestado = new ItemAuditoriaAtestado();
        
        cloneItemAuditoriaAtestado.setId(this.getValue(itemAuditoriaAtestado, "getId"));
        cloneItemAuditoriaAtestado.setVersion(this.getValue(itemAuditoriaAtestado, "getVersion"));
        cloneItemAuditoriaAtestado.setDescricao(this.getValue(itemAuditoriaAtestado, "getDescricao"));
        
        return cloneItemAuditoriaAtestado;
    }
    
    cloneList(itemAuditoriaAtestados: Array<ItemAuditoriaAtestado>){
        
        if(itemAuditoriaAtestados === null || itemAuditoriaAtestados === undefined)
            itemAuditoriaAtestados = new Array<ItemAuditoriaAtestado>();
        
        let array:Array<ItemAuditoriaAtestado> = new Array<ItemAuditoriaAtestado>();
    
        for (let itemAuditoriaAtestado of itemAuditoriaAtestados) {
            array.push(this.clone(itemAuditoriaAtestado));
        }
    
        return array;
    }
    
}