import { Criterio } from './../../model/criterio';
import { GenericBuilder } from './../../generics/generic.builder';

export class CriterioBuilder extends GenericBuilder {

    initialize(criterio: Criterio) {
        criterio = new Criterio();
        return criterio;
    }
    
    initializeList(criterios: Array<Criterio>) {
        
        let array: Array<Criterio> = new Array<Criterio>();
        
        if(criterios === null || criterios === undefined)
            criterios = new Array<Criterio>();
        
        for (let criterio of criterios) {
            array.push(this.initialize(criterio));
        }
        
        return array;
    }
    
    clone(criterio: Criterio): Criterio {
        
        if (criterio === null || criterio === undefined)
            criterio = new Criterio();
        
        let cloneCriterio = new Criterio();
        cloneCriterio.setId(this.getValue(criterio,"getId"));
        cloneCriterio.setNome(this.getValue(criterio, "getNome"));
        cloneCriterio.setTipo(this.getValue(criterio, "getTipo"));
        cloneCriterio.setVersion(this.getValue(criterio, "getVersion"));
        
        let tipo:string = this.getValue(criterio, "getTipo");
        if(tipo == "")
            tipo = undefined;
        cloneCriterio.setTipo(tipo);
        
        return cloneCriterio;
    }
    
    cloneList(criterios: Array<Criterio>): Array<Criterio>{
        let array:Array<Criterio> = new Array<Criterio>();
    
        if (criterios !== null && criterios !== undefined) {
            for (let criterio of criterios) {
                array.push(this.clone(criterio));
            }
        }
    
        return array;
    }
    
}