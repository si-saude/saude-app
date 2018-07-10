import { ParteCorpoAtingida } from '../../model/parte-corpo-atingida';
import { GenericBuilder } from '../../generics/generic.builder';

export class ParteCorpoAtingidaBuilder extends GenericBuilder {

    initialize(parteCorpoAtingida: ParteCorpoAtingida) {
        parteCorpoAtingida = new ParteCorpoAtingida();
        return parteCorpoAtingida;
    }
    
    initializeList(parteCorpoAtingidas: Array<ParteCorpoAtingida>) {
        
        let array:Array<ParteCorpoAtingida> = new Array<ParteCorpoAtingida>();
        
        if(parteCorpoAtingidas === null || parteCorpoAtingidas === undefined)
            parteCorpoAtingidas = new Array<ParteCorpoAtingida>();
        
        for (let parteCorpoAtingida of parteCorpoAtingidas) {
            array.push(this.initialize(parteCorpoAtingida));
        }
        
        return array;
    }
    
    clone(parteCorpoAtingida: ParteCorpoAtingida): ParteCorpoAtingida {
        
        if (parteCorpoAtingida === null || parteCorpoAtingida === undefined)
            parteCorpoAtingida = new ParteCorpoAtingida();
        
        let cloneParteCorpoAtingida = new ParteCorpoAtingida();
        cloneParteCorpoAtingida.setId(this.getValue(parteCorpoAtingida,"getId"));
        cloneParteCorpoAtingida.setCodigo(this.getValue(parteCorpoAtingida, "getCodigo"));
        cloneParteCorpoAtingida.setDescricao(this.getValue(parteCorpoAtingida, "getDescricao"));
        cloneParteCorpoAtingida.setVersion(this.getValue(parteCorpoAtingida, "getVersion"));
        return cloneParteCorpoAtingida;
    }
    
    cloneList(parteCorpoAtingidas: Array<ParteCorpoAtingida>): Array<ParteCorpoAtingida> {
        let array:Array<ParteCorpoAtingida> = new Array<ParteCorpoAtingida>();
    
        if (parteCorpoAtingidas !== null && parteCorpoAtingidas !== undefined) { 
            for (let parteCorpoAtingida of parteCorpoAtingidas) {
                array.push(this.clone(parteCorpoAtingida));
            }
        }
        
        return array;
    }
    
}