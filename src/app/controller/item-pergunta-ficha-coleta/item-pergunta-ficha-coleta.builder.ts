import { ItemPerguntaFichaColeta } from './../../model/item-pergunta-ficha-coleta';
import { PerguntaFichaColeta } from './../../model/pergunta-ficha-coleta';
import { PerguntaFichaColetaBuilder } from './../pergunta-ficha-coleta/pergunta-ficha-coleta.builder';
import { GenericBuilder } from './../../generics/generic.builder';

export class ItemPerguntaFichaColetaBuilder extends GenericBuilder {
    
    initialize(itemPerguntaFichaColeta: ItemPerguntaFichaColeta): ItemPerguntaFichaColeta {
        itemPerguntaFichaColeta = new ItemPerguntaFichaColeta();
            
        itemPerguntaFichaColeta.setPergunta(
                new PerguntaFichaColetaBuilder().initialize(new PerguntaFichaColeta()));
        
        return itemPerguntaFichaColeta;
    }
    
    initializeList(itemPerguntaFichaColetas: Array<ItemPerguntaFichaColeta>) {
        
        let array:Array<ItemPerguntaFichaColeta> = new Array<ItemPerguntaFichaColeta>();
        
        if(itemPerguntaFichaColetas === null || itemPerguntaFichaColetas === undefined)
            itemPerguntaFichaColetas = new Array<ItemPerguntaFichaColeta>();
        
        for (let itemPerguntaFichaColeta of itemPerguntaFichaColetas) {
            array.push(this.initialize(itemPerguntaFichaColeta));
        }
        
        return array;
    }
    
    clone(itemPerguntaFichaColeta: ItemPerguntaFichaColeta): ItemPerguntaFichaColeta {        
        let cloneItemPerguntaFichaColeta = new ItemPerguntaFichaColeta();
        
        if (itemPerguntaFichaColeta === null || itemPerguntaFichaColeta === undefined)
            itemPerguntaFichaColeta = new ItemPerguntaFichaColeta();
        
        cloneItemPerguntaFichaColeta.setId(this.getValue(itemPerguntaFichaColeta, "getId"));
        cloneItemPerguntaFichaColeta.setVersion(this.getValue(itemPerguntaFichaColeta, "getVersion"));
        cloneItemPerguntaFichaColeta.setLabel(this.getValue(itemPerguntaFichaColeta, "getLabel"));
        cloneItemPerguntaFichaColeta.setPath(this.getValue(itemPerguntaFichaColeta, "getPath"));
        
        cloneItemPerguntaFichaColeta.setPergunta(new PerguntaFichaColeta());
        
        return cloneItemPerguntaFichaColeta;
    }
    
    cloneList(itemPerguntaFichaColetas: Array<ItemPerguntaFichaColeta>){
        
        if(itemPerguntaFichaColetas === null || itemPerguntaFichaColetas === undefined)
            itemPerguntaFichaColetas = new Array<ItemPerguntaFichaColeta>();
        
        let array:Array<ItemPerguntaFichaColeta> = new Array<ItemPerguntaFichaColeta>();
    
        for (let itemPerguntaFichaColeta of itemPerguntaFichaColetas) {
            array.push(this.clone(itemPerguntaFichaColeta));
        }
    
        return array;
    }
    
}