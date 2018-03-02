import { GenericBuilder } from './../../generics/generic.builder'
import { RiscoGhe } from './../../model/risco-ghe';

export class RiscoGheBuilder extends GenericBuilder {
    
    initialize(risco: RiscoGhe) {
        risco = new RiscoGhe();
        return risco;
    }
    
    clone(risco: RiscoGhe): RiscoGhe {
        
        if (risco === null || risco === undefined)
            risco = new RiscoGhe();
        
        let cloneRiscoGhe = new RiscoGhe();
        cloneRiscoGhe.setId(this.getValue(risco,"getId"));
        cloneRiscoGhe.setTitulo(this.getValue(risco, "getTitulo"));
        cloneRiscoGhe.setVersion(this.getValue(risco, "getVersion"));
        return cloneRiscoGhe;
    }
}