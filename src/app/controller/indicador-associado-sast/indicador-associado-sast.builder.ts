import { IndicadorSast } from './../../model/indicador-sast';
import { IndicadorSastBuilder } from './../indicador-sast/indicador-sast.builder';
import { IndicadorAssociadoSast } from './../../model/indicador-associado-sast';
import { GenericBuilder } from './../../generics/generic.builder';

export class IndicadorAssociadoSastBuilder extends GenericBuilder {
    
    initialize(indicadorAssociadoSast: IndicadorAssociadoSast): IndicadorAssociadoSast {
        indicadorAssociadoSast = new IndicadorAssociadoSast();
        
        indicadorAssociadoSast.setIndicadorSast(new IndicadorSast());
        
        return indicadorAssociadoSast;
    }
    
    initializeList(indicadorAssociadoSasts: Array<IndicadorAssociadoSast>) {
        
        let array:Array<IndicadorAssociadoSast> = new Array<IndicadorAssociadoSast>();
        
        if(indicadorAssociadoSasts === null || indicadorAssociadoSasts === undefined)
            indicadorAssociadoSasts = new Array<IndicadorAssociadoSast>();
        
        for (let indicadorAssociadoSast of indicadorAssociadoSasts) {
            array.push(this.initialize(indicadorAssociadoSast));
        }
        
        return array;
    }
    
    clone(indicadorAssociadoSast: IndicadorAssociadoSast): IndicadorAssociadoSast {        
        let cloneIndicadorAssociadoSast = new IndicadorAssociadoSast();
        
        if (indicadorAssociadoSast === null || indicadorAssociadoSast === undefined)
            indicadorAssociadoSast = new IndicadorAssociadoSast();
        
        cloneIndicadorAssociadoSast.setId(this.getValue(indicadorAssociadoSast , "getId"));
        cloneIndicadorAssociadoSast.setVersion(this.getValue(indicadorAssociadoSast , "getVersion"));
        cloneIndicadorAssociadoSast.setCodigo(this.getValue(indicadorAssociadoSast , "getCodigo"));
        
        cloneIndicadorAssociadoSast.setIndicadorSast(
                new IndicadorSastBuilder().clone(this.getValue(indicadorAssociadoSast,"getIndicadorSast")));
        
        return cloneIndicadorAssociadoSast;
    }
    
    cloneList(indicadorAssociadoSasts: Array<IndicadorAssociadoSast>){
        
        if(indicadorAssociadoSasts === null || indicadorAssociadoSasts === undefined)
            indicadorAssociadoSasts = new Array<IndicadorAssociadoSast>();
        
        let array:Array<IndicadorAssociadoSast> = new Array<IndicadorAssociadoSast>();
    
        for (let indicadorAssociadoSast of indicadorAssociadoSasts) {
            array.push(this.clone(indicadorAssociadoSast));
        }
    
        return array;
    }
    
}