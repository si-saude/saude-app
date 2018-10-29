import { GenericFilter } from './../../generics/generic.filter';
import { BooleanFilter } from './../../generics/boolean.filter';

export class IndicadorConhecimentoAlimentarFilter extends GenericFilter {
    private enunciado: string;
    private inativo: BooleanFilter;
   
    constructor() {
        super();
    }

    public getEnunciado() {
        return this.enunciado;
    }
    
    public setEnunciado(enunciado: string) {
        this.enunciado = enunciado;
    }
    
    public getInativo() {
        return this.inativo;
    }
    
    public setInativo(inativo: BooleanFilter) {
        this.inativo = inativo;
    }
       
}