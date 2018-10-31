import { IndicadorConhecimentoAlimentar } from './../../model/indicador-conhecimento-alimentar';
import { ItemIndicadorConhecimentoAlimentarBuilder } from './../item-indicador-conhecimento-alimentar/item-indicador-conhecimento-alimentar.builder';
import { GenericBuilder } from './../../generics/generic.builder';

export class IndicadorConhecimentoAlimentarBuilder extends GenericBuilder {

    initialize(indicadorConhecimentoAlimentar: IndicadorConhecimentoAlimentar) {
        indicadorConhecimentoAlimentar = new IndicadorConhecimentoAlimentar();
        
        indicadorConhecimentoAlimentar.setItemIndicadorConhecimentoAlimentares(
                new ItemIndicadorConhecimentoAlimentarBuilder().initializeList(null));
        
        return indicadorConhecimentoAlimentar;
    }
    
    initializeList(indicadorConhecimentoAlimentares: Array<IndicadorConhecimentoAlimentar>) {
        
        let array:Array<IndicadorConhecimentoAlimentar> = new Array<IndicadorConhecimentoAlimentar>();
        
        if(indicadorConhecimentoAlimentares === null || indicadorConhecimentoAlimentares === undefined)
            indicadorConhecimentoAlimentares = new Array<IndicadorConhecimentoAlimentar>();
        
        for (let indicadorConhecimentoAlimentar of indicadorConhecimentoAlimentares) {
            array.push(this.initialize(indicadorConhecimentoAlimentar));
        }
        
        return array;
    }
    
    clone(indicadorConhecimentoAlimentar: IndicadorConhecimentoAlimentar): IndicadorConhecimentoAlimentar {
        
        if (indicadorConhecimentoAlimentar === null || indicadorConhecimentoAlimentar === undefined)
            indicadorConhecimentoAlimentar = new IndicadorConhecimentoAlimentar();
        
        let cloneIndicadorConhecimentoAlimentar = new IndicadorConhecimentoAlimentar();
        cloneIndicadorConhecimentoAlimentar.setId(this.getValue(indicadorConhecimentoAlimentar,"getId"));
        cloneIndicadorConhecimentoAlimentar.setEnunciado(this.getValue(indicadorConhecimentoAlimentar, "getEnunciado"));
        cloneIndicadorConhecimentoAlimentar.setOrdem(this.getValue(indicadorConhecimentoAlimentar, "getOrdem"));
        cloneIndicadorConhecimentoAlimentar.setInativo(this.getValue(indicadorConhecimentoAlimentar, "getInativo"));
        cloneIndicadorConhecimentoAlimentar.setItemIndicadorConhecimentoAlimentares(
                new ItemIndicadorConhecimentoAlimentarBuilder().cloneList(
                        this.getValue(indicadorConhecimentoAlimentar, "getItemIndicadorConhecimentoAlimentares")));
        
        cloneIndicadorConhecimentoAlimentar.setVersion(this.getValue(indicadorConhecimentoAlimentar, "getVersion"));
        return cloneIndicadorConhecimentoAlimentar;
    }
    
    cloneList(indicadorConhecimentoAlimentares: Array<IndicadorConhecimentoAlimentar>): Array<IndicadorConhecimentoAlimentar> {
        let array:Array<IndicadorConhecimentoAlimentar> = new Array<IndicadorConhecimentoAlimentar>();
        if (indicadorConhecimentoAlimentares !== null && indicadorConhecimentoAlimentares !== undefined) { 
            for (let indicadorConhecimentoAlimentar of indicadorConhecimentoAlimentares) {
                array.push(this.clone(indicadorConhecimentoAlimentar));
            }
        }
        
        return array;
    }
    
}