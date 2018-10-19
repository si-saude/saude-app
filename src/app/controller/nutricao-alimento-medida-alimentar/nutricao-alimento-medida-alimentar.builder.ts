import { NutricaoAlimentoMedidaAlimentar } from '../../model/nutricao-alimento-medida-alimentar';
import { MedidaAlimentarBuilder } from './../medida-alimentar/medida-alimentar.builder';
import { NutricaoAlimentoBuilder } from './../nutricao-alimento/nutricao-alimento.builder';
import { GenericBuilder } from '../../generics/generic.builder';
import { Util } from './../../generics/utils/util';

export class NutricaoAlimentoMedidaAlimentarBuilder extends GenericBuilder {

    initialize(nutricaoAlimentoMedidaAlimentar: NutricaoAlimentoMedidaAlimentar) {
        nutricaoAlimentoMedidaAlimentar = new NutricaoAlimentoMedidaAlimentar();
        
        nutricaoAlimentoMedidaAlimentar.setMedidaAlimentar(new MedidaAlimentarBuilder().initialize(null));
        nutricaoAlimentoMedidaAlimentar.setNutricaoAlimento(new NutricaoAlimentoBuilder().initialize(null));
        
        return nutricaoAlimentoMedidaAlimentar;
    }
    
    initializeList(nutricaoAlimentoMedidaAlimentares: Array<NutricaoAlimentoMedidaAlimentar>) {
        
        let array:Array<NutricaoAlimentoMedidaAlimentar> = new Array<NutricaoAlimentoMedidaAlimentar>();
        
        if(nutricaoAlimentoMedidaAlimentares === null || nutricaoAlimentoMedidaAlimentares === undefined)
            nutricaoAlimentoMedidaAlimentares = new Array<NutricaoAlimentoMedidaAlimentar>();
        
        for (let nutricaoAlimentoMedidaAlimentar of nutricaoAlimentoMedidaAlimentares) {
            array.push(this.initialize(nutricaoAlimentoMedidaAlimentar));
        }
        
        return array;
    }
    
    clone(nutricaoAlimentoMedidaAlimentar: NutricaoAlimentoMedidaAlimentar): NutricaoAlimentoMedidaAlimentar {
        
        if (nutricaoAlimentoMedidaAlimentar === null || nutricaoAlimentoMedidaAlimentar === undefined)
            nutricaoAlimentoMedidaAlimentar = new NutricaoAlimentoMedidaAlimentar();
        
        let cloneNutricaoAlimentoMedidaAlimentar = new NutricaoAlimentoMedidaAlimentar();
        cloneNutricaoAlimentoMedidaAlimentar.setId(this.getValue(nutricaoAlimentoMedidaAlimentar,"getId"));
        cloneNutricaoAlimentoMedidaAlimentar.setVersion(this.getValue(nutricaoAlimentoMedidaAlimentar, "getVersion"));
        cloneNutricaoAlimentoMedidaAlimentar.setQuantidade(Util.treatDouble(this.getValue(nutricaoAlimentoMedidaAlimentar, "getQuantidade")));
        cloneNutricaoAlimentoMedidaAlimentar.setReferencia(this.getValue(nutricaoAlimentoMedidaAlimentar, "getReferencia"));
        
        cloneNutricaoAlimentoMedidaAlimentar.setMedidaAlimentar(
                new MedidaAlimentarBuilder().clone(this.getValue(nutricaoAlimentoMedidaAlimentar, "getMedidaAlimentar")));
        cloneNutricaoAlimentoMedidaAlimentar.setNutricaoAlimento(
                new NutricaoAlimentoBuilder().clone(this.getValue(nutricaoAlimentoMedidaAlimentar, "getNutricaoAlimento")));
        
        return cloneNutricaoAlimentoMedidaAlimentar;
    }
    
    cloneList(nutricaoAlimentoMedidaAlimentares: Array<NutricaoAlimentoMedidaAlimentar>): Array<NutricaoAlimentoMedidaAlimentar> {
        let array:Array<NutricaoAlimentoMedidaAlimentar> = new Array<NutricaoAlimentoMedidaAlimentar>();
        if (nutricaoAlimentoMedidaAlimentares !== null && nutricaoAlimentoMedidaAlimentares !== undefined) { 
            for (let nutricaoAlimentoMedidaAlimentar of nutricaoAlimentoMedidaAlimentares) {
                array.push(this.clone(nutricaoAlimentoMedidaAlimentar));
            }
        }
        
        return array;
    }
}