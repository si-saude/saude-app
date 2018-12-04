import { AlimentoMedidaAlimentar } from '../../model/alimento-medida-alimentar';
import { MedidaAlimentarBuilder } from './../medida-alimentar/medida-alimentar.builder';
import { AlimentoBuilder } from './../alimento/alimento.builder';
import { GenericBuilder } from '../../generics/generic.builder';
import { Util } from './../../generics/utils/util';

export class AlimentoMedidaAlimentarBuilder extends GenericBuilder {

    initialize(alimentoMedidaAlimentar: AlimentoMedidaAlimentar) {
        alimentoMedidaAlimentar = new AlimentoMedidaAlimentar();
        
        alimentoMedidaAlimentar.setMedidaAlimentar(new MedidaAlimentarBuilder().initialize(null));
        alimentoMedidaAlimentar.setAlimento(new AlimentoBuilder().initialize(null));
        
        return alimentoMedidaAlimentar;
    }
    
    initializeList(alimentoMedidaAlimentares: Array<AlimentoMedidaAlimentar>) {
        
        let array:Array<AlimentoMedidaAlimentar> = new Array<AlimentoMedidaAlimentar>();
        
        if(alimentoMedidaAlimentares === null || alimentoMedidaAlimentares === undefined)
            alimentoMedidaAlimentares = new Array<AlimentoMedidaAlimentar>();
        
        for (let alimentoMedidaAlimentar of alimentoMedidaAlimentares) {
            array.push(this.initialize(alimentoMedidaAlimentar));
        }
        
        return array;
    }
    
    clone(alimentoMedidaAlimentar: AlimentoMedidaAlimentar): AlimentoMedidaAlimentar {
        
        if (alimentoMedidaAlimentar === null || alimentoMedidaAlimentar === undefined)
            alimentoMedidaAlimentar = new AlimentoMedidaAlimentar();
        
        let cloneAlimentoMedidaAlimentar = new AlimentoMedidaAlimentar();
        cloneAlimentoMedidaAlimentar.setId(this.getValue(alimentoMedidaAlimentar,"getId"));
        cloneAlimentoMedidaAlimentar.setVersion(this.getValue(alimentoMedidaAlimentar, "getVersion"));
        cloneAlimentoMedidaAlimentar.setQuantidade(Util.treatDouble(this.getValue(alimentoMedidaAlimentar, "getQuantidade")));
        cloneAlimentoMedidaAlimentar.setReferencia(this.getValue(alimentoMedidaAlimentar, "getReferencia"));
        
        cloneAlimentoMedidaAlimentar.setMedidaAlimentar(
                new MedidaAlimentarBuilder().clone(this.getValue(alimentoMedidaAlimentar, "getMedidaAlimentar")));
        cloneAlimentoMedidaAlimentar.setAlimento(
                new AlimentoBuilder().clone(this.getValue(alimentoMedidaAlimentar, "getAlimento")));
        
        return cloneAlimentoMedidaAlimentar;
    }
    
    cloneList(alimentoMedidaAlimentares: Array<AlimentoMedidaAlimentar>): Array<AlimentoMedidaAlimentar> {
        let array:Array<AlimentoMedidaAlimentar> = new Array<AlimentoMedidaAlimentar>();
        if (alimentoMedidaAlimentares !== null && alimentoMedidaAlimentares !== undefined) { 
            for (let alimentoMedidaAlimentar of alimentoMedidaAlimentares) {
                array.push(this.clone(alimentoMedidaAlimentar));
            }
        }
        
        return array;
    }
    
    treatNumber( value: string ) {
        if ( value != undefined ) {
            let realValue = value.toString().replace(/\.|\,||/gi, "");
            return Number(realValue.substring(0, realValue.length - 2)+"."+realValue.substring(realValue.length-2, realValue.length));
        }
    }
}