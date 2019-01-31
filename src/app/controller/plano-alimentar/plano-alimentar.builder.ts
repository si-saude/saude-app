import { PlanoAlimentar } from './../../model/plano-alimentar';
import { Atendimento } from './../../model/atendimento';
import { RefeicaoPlanoBuilder } from './../refeicao-plano/refeicao-plano.builder';
import { GenericBuilder } from './../../generics/generic.builder';
import { Util } from './../../generics/utils/util';

export class PlanoAlimentarBuilder extends GenericBuilder {

    initialize(planoAlimentar: PlanoAlimentar) {
        planoAlimentar = new PlanoAlimentar();
        
        planoAlimentar.setAtendimento(new Atendimento());
        planoAlimentar.setRefeicoes(new RefeicaoPlanoBuilder().initializeList(null));
        
        return planoAlimentar;
    }
    
    initializeList(planoAlimentares: Array<PlanoAlimentar>) {
        
        let array:Array<PlanoAlimentar> = new Array<PlanoAlimentar>();
        
        if(planoAlimentares === null || planoAlimentares === undefined)
            planoAlimentares = new Array<PlanoAlimentar>();
        
        for (let planoAlimentar of planoAlimentares) {
            array.push(this.initialize(planoAlimentar));
        }
        
        return array;
    }
    
    clone(planoAlimentar: PlanoAlimentar): PlanoAlimentar {
        
        if (planoAlimentar === null || planoAlimentar === undefined)
            planoAlimentar = new PlanoAlimentar();
        
        let clonePlanoAlimentar = new PlanoAlimentar();
        clonePlanoAlimentar.setId(this.getValue(planoAlimentar,"getId"));
        clonePlanoAlimentar.setNe(this.getValue(planoAlimentar, "getNe"));
        clonePlanoAlimentar.setTmb(this.getValue(planoAlimentar, "getTmb"));
        clonePlanoAlimentar.setObjetivo(this.getValue(planoAlimentar, "getObjetivo"));
        clonePlanoAlimentar.setVersion(this.getValue(planoAlimentar, "getVersion"));
        
        clonePlanoAlimentar.setAtendimento(new Atendimento());
        if ( this.getValue(planoAlimentar, "getRefeicoes") != undefined ) {
            clonePlanoAlimentar.setRefeicoes(new RefeicaoPlanoBuilder().cloneList(this.getValue(planoAlimentar,"getRefeicoes")));
        } else {
            clonePlanoAlimentar.setRefeicoes(undefined);
        }
        
        return clonePlanoAlimentar;
    }
    
    cloneList(planoAlimentares: Array<PlanoAlimentar>): Array<PlanoAlimentar> {
        let array:Array<PlanoAlimentar> = new Array<PlanoAlimentar>();
        if (planoAlimentares !== null && planoAlimentares !== undefined) { 
            for (let planoAlimentar of planoAlimentares) {
                array.push(this.clone(planoAlimentar));
            }
        }
        
        return array;
    }
    
    treatNe( value: string ) {
        if ( value != undefined ) {
            let realValue = value.toString().replace(/\.|\,||/gi, "");
            return Number(realValue.substring(0, realValue.length - 2)+"."+realValue.substring(realValue.length-2, realValue.length));
        }
    }
    
}