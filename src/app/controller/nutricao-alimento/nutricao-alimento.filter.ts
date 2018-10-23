import { GenericFilter } from '../../generics/generic.filter';
import { BooleanFilter } from './../../generics/boolean.filter';

export class NutricaoAlimentoFilter extends GenericFilter {
    private inativo: BooleanFilter;
    
    constructor() {
        super();
    }

    public getInativo() {
        return this.inativo;
    }
    
    public setInativo(i) {
        this.inativo = i;
    }
           
}