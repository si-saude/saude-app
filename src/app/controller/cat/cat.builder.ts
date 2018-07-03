import { Cat } from './../../model/cat';
import { GenericBuilder } from './../../generics/generic.builder';

export class CatBuilder extends GenericBuilder {

    initialize(cat: Cat) {
        cat = new Cat();
        return cat;
    }
    
    clone(cat: Cat): Cat {
        
        if (cat === null || cat === undefined)
            cat = new Cat();
        
        let cloneCat = new Cat();
        cloneCat.setId(this.getValue(cat,"getId"));
        cloneCat.setNumero(this.getValue(cat, "getNumero"));
        cloneCat.setVersion(this.getValue(cat, "getVersion"));
        
        return cloneCat;
    }
    
}