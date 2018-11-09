import { Aso } from './../../model/aso';
import { ItemAuditoriaAso } from './../../model/item-auditoria-aso';

import { GenericBuilder } from './../../generics/generic.builder';
import { AsoBuilder } from './../aso/aso.builder';




export class ItemAuditoriaAsoBuilder extends GenericBuilder {

    initialize(itemAuditoriaAso: ItemAuditoriaAso) {
        itemAuditoriaAso = new ItemAuditoriaAso();
        itemAuditoriaAso.setAso(new AsoBuilder().initialize(new Aso()));
        return itemAuditoriaAso;
    }
    
    clone(itemAuditoriaAso: ItemAuditoriaAso): ItemAuditoriaAso {
        
        if (itemAuditoriaAso === null || itemAuditoriaAso === undefined)
            itemAuditoriaAso = new ItemAuditoriaAso();
        
        
        let cloneItemAuditoriaAso = new ItemAuditoriaAso();
        cloneItemAuditoriaAso.setId(this.getValue(itemAuditoriaAso,"getId"));
        cloneItemAuditoriaAso.setVersion(this.getValue(itemAuditoriaAso, "getVersion"));
        cloneItemAuditoriaAso.setOrdem(this.getValue(itemAuditoriaAso,"getOrdem"));
        cloneItemAuditoriaAso.setConforme(this.getValue(itemAuditoriaAso,"getConforme"));
        cloneItemAuditoriaAso.setDescricao(this.getValue(itemAuditoriaAso,"getDescricao"));
        
        cloneItemAuditoriaAso.setAso(new AsoBuilder().clone(this.getValue( itemAuditoriaAso, "getAso" )));
        
        
        if (this.getValue(itemAuditoriaAso, "getAso") !== undefined) { 
            cloneItemAuditoriaAso.setAso(
                    new AsoBuilder().clone(this.getValue(itemAuditoriaAso,"getAso")));
            if(!this.idGtZero(cloneItemAuditoriaAso.getAso()))
                cloneItemAuditoriaAso.setAso(undefined);
        } else {
            cloneItemAuditoriaAso.setAso(new AsoBuilder().initialize(null));
        }
        
        return cloneItemAuditoriaAso;
    }
    
    cloneList(itemAuditoriaAsos: Array<ItemAuditoriaAso>): Array<ItemAuditoriaAso> {
        let array:Array<ItemAuditoriaAso> = new Array<ItemAuditoriaAso>();
    
        if (itemAuditoriaAsos !== null && itemAuditoriaAsos !== undefined) { 
            for (let itemAuditoriaAso of itemAuditoriaAsos) {
                array.push(this.clone(itemAuditoriaAso));
            }
        }
        
        return array;
    }
    
    initializeList(itemAuditoriaAsos: Array<ItemAuditoriaAso>) {
        
        let array:Array<ItemAuditoriaAso> = new Array<ItemAuditoriaAso>();
        
        if(itemAuditoriaAsos === null || itemAuditoriaAsos === undefined)
            itemAuditoriaAsos = new Array<ItemAuditoriaAso>();
        
        for (let itemAuditoriaAso of itemAuditoriaAsos) {
            array.push(this.initialize(itemAuditoriaAso));
        }
        
        return array;
    }
    
}