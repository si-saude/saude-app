import { Periodicidade } from './../../model/periodicidade';
import { GenericBuilder } from './../../generics/generic.builder';

export class PeriodicidadeBuilder extends GenericBuilder{
    
    initialize(periodicidade: Periodicidade): Periodicidade{
        periodicidade = new Periodicidade();
        
        return periodicidade;
    }
    
   clone(periodicidade: Periodicidade): Periodicidade {        
        let clonePeriodicidade = new Periodicidade();
        
        if (periodicidade === null || periodicidade === undefined)
            periodicidade = new Periodicidade();
        
        clonePeriodicidade.setId(this.getValue(periodicidade, "getId"));
        clonePeriodicidade.setVersion(this.getValue(periodicidade, "getVersion"));
        clonePeriodicidade.setDescricao(this.getValue(periodicidade, "getDescricao"));
        clonePeriodicidade.setMeses(this.getValue(periodicidade, "getMeses"));
        
        return clonePeriodicidade;
    } 
    
    
}