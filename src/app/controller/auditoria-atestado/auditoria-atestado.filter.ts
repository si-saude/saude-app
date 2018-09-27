import { GenericFilter } from '../../generics/generic.filter';
import { BooleanFilter } from './../../generics/boolean.filter';

export class AuditoriaAtestadoFilter extends GenericFilter {
    private conforme: BooleanFilter;
    
    constructor() {
        super();
    }

    public getConforme() {
        return this.conforme;
    }
    
    public setConforme(c: BooleanFilter) {
        this.conforme = c;
    }       
}