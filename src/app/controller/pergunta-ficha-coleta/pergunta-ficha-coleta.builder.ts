import { PerguntaFichaColeta } from './../../model/pergunta-ficha-coleta';
import { ItemPerguntaFichaColeta } from './../../model/item-pergunta-ficha-coleta';
import { ItemPerguntaFichaColetaBuilder } from './../item-pergunta-ficha-coleta/item-pergunta-ficha-coleta.builder';
import { GenericBuilder } from './../../generics/generic.builder';

export class PerguntaFichaColetaBuilder extends GenericBuilder{
    
    initialize(perguntaFichaColeta: PerguntaFichaColeta): PerguntaFichaColeta {
        perguntaFichaColeta = new PerguntaFichaColeta();
        
        perguntaFichaColeta.setItens(
                new ItemPerguntaFichaColetaBuilder().initializeList(new Array<ItemPerguntaFichaColeta>()));
        
        return perguntaFichaColeta;
    }
    
    initializeList(perguntaFichaColetas: Array<PerguntaFichaColeta>) {
        
        let array:Array<PerguntaFichaColeta> = new Array<PerguntaFichaColeta>();
        
        if(perguntaFichaColetas === null || perguntaFichaColetas === undefined)
            perguntaFichaColetas = new Array<PerguntaFichaColeta>();
        
        for (let perguntaFichaColeta of perguntaFichaColetas) {
            array.push(this.initialize(perguntaFichaColeta));
        }
        
        return array;
    }
    
    clone(perguntaFichaColeta: PerguntaFichaColeta): PerguntaFichaColeta {        
        let clonePerguntaFichaColeta = new PerguntaFichaColeta();
        
        if (perguntaFichaColeta === null || perguntaFichaColeta === undefined)
            perguntaFichaColeta = new PerguntaFichaColeta();
        
        clonePerguntaFichaColeta.setId(this.getValue(perguntaFichaColeta, "getId"));
        clonePerguntaFichaColeta.setVersion(this.getValue(perguntaFichaColeta, "getVersion"));
        clonePerguntaFichaColeta.setCodigo(this.getValue(perguntaFichaColeta, "getCodigo"));
        clonePerguntaFichaColeta.setDescricao(this.getValue(perguntaFichaColeta, "getDescricao"));
        clonePerguntaFichaColeta.setInativo(this.getValue(perguntaFichaColeta, "getInativo"));
        
        if(this.getValue(perguntaFichaColeta, "getGrupo") == "")
            clonePerguntaFichaColeta.setGrupo(undefined);
        else if (this.getValue(perguntaFichaColeta, "getGrupo") == undefined)
            clonePerguntaFichaColeta.setGrupo("");
        else
            clonePerguntaFichaColeta.setGrupo(this.getValue(perguntaFichaColeta, "getGrupo"));
        
        if(this.getValue(perguntaFichaColeta, "getTipo") == "")
            clonePerguntaFichaColeta.setTipo(undefined);
        else if (this.getValue(perguntaFichaColeta, "getTipo") == undefined)
            clonePerguntaFichaColeta.setTipo("");
        else
            clonePerguntaFichaColeta.setTipo(this.getValue(perguntaFichaColeta, "getTipo"));
        
        clonePerguntaFichaColeta.setItens(
                new ItemPerguntaFichaColetaBuilder().cloneList(
                        this.getValue(perguntaFichaColeta, "getItens")));
        
        return clonePerguntaFichaColeta;
    }
    
    cloneList(perguntaFichaColetas: Array<PerguntaFichaColeta>){
        
        if(perguntaFichaColetas === null || perguntaFichaColetas === undefined)
            perguntaFichaColetas = new Array<PerguntaFichaColeta>();
        
        let array:Array<PerguntaFichaColeta> = new Array<PerguntaFichaColeta>();
    
        for (let perguntaFichaColeta of perguntaFichaColetas) {
            array.push(this.clone(perguntaFichaColeta));
        }
    
        return array;
    }
    
}