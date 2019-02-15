import { ItemRespostaFichaColeta } from './../../model/item-resposta-ficha-coleta';
import { RespostaFichaColeta } from './../../model/resposta-ficha-coleta';
import { GenericBuilder } from './../../generics/generic.builder';

export class ItemRespostaFichaColetaBuilder extends GenericBuilder{
    
    initialize(itemRespostaFichaColeta: ItemRespostaFichaColeta): ItemRespostaFichaColeta {
        if ( itemRespostaFichaColeta == null || 
                itemRespostaFichaColeta == undefined ) return null;
        else itemRespostaFichaColeta = new ItemRespostaFichaColeta();
        
        itemRespostaFichaColeta.setItem( new ItemRespostaFichaColeta() );
//        itemRespostaFichaColeta.setResposta( new RespostaFichaColeta() );
        
        return itemRespostaFichaColeta;
    }
    
    initializeList(instalacoes: Array<ItemRespostaFichaColeta>) {
        
        let array:Array<ItemRespostaFichaColeta> = new Array<ItemRespostaFichaColeta>();
        
        if(instalacoes === null || instalacoes === undefined)
            instalacoes = new Array<ItemRespostaFichaColeta>();
        
        for (let itemRespostaFichaColeta of instalacoes) {
            array.push(this.initialize(itemRespostaFichaColeta));
        }
        
        return array;
    }
    
    clone(itemRespostaFichaColeta: ItemRespostaFichaColeta): ItemRespostaFichaColeta {        
        let cloneItemRespostaFichaColeta = new ItemRespostaFichaColeta();
        
        if (itemRespostaFichaColeta === null || itemRespostaFichaColeta === undefined)
            itemRespostaFichaColeta = new ItemRespostaFichaColeta();
        
        cloneItemRespostaFichaColeta.setId(this.getValue(itemRespostaFichaColeta, "getId"));
        cloneItemRespostaFichaColeta.setIndex(this.getValue( cloneItemRespostaFichaColeta, "getIndex" ));
        cloneItemRespostaFichaColeta.setVersion(this.getValue(itemRespostaFichaColeta, "getVersion"));
        cloneItemRespostaFichaColeta.setConteudo(this.getValue(itemRespostaFichaColeta, "getConteudo"));
        
        if ( this.getValue(itemRespostaFichaColeta, "getItem") != undefined || 
                this.getValue(itemRespostaFichaColeta, "getItem") != null )
            cloneItemRespostaFichaColeta.setItem(
                    new ItemRespostaFichaColetaBuilder().clone(this.getValue(itemRespostaFichaColeta, "getItem")));
        
//        cloneItemRespostaFichaColeta.setResposta(new RespostaFichaColeta());
        
        return cloneItemRespostaFichaColeta;
    }
    
    cloneList(instalacoes: Array<ItemRespostaFichaColeta>){
        
        if(instalacoes === null || instalacoes === undefined)
            instalacoes = new Array<ItemRespostaFichaColeta>();
        
        let array:Array<ItemRespostaFichaColeta> = new Array<ItemRespostaFichaColeta>();
    
        for (let itemRespostaFichaColeta of instalacoes) {
            array.push(this.clone(itemRespostaFichaColeta));
        }
    
        return array;
    }
    
}