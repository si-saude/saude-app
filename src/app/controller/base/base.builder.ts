import { Base } from '../../model/base';
import { GenericBuilder } from '../../generics/generic.builder';

export class BaseBuilder extends GenericBuilder {

    initialize(base: Base) {
        base = new Base();
        return base;
    }
    
    clone(base: Base): Base {
        
        if (base === null || base === undefined)
            base = new Base();
        
        let cloneBase = new Base();
        cloneBase.setId(this.getValue(base,"getId"));
        cloneBase.setNome(this.getValue(base, "getNome"));
        cloneBase.setUf(this.getValue(base, "getUf"));
        cloneBase.setVersion(this.getValue(base, "getVersion"));
        return cloneBase;
    }
    
}