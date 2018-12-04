import { GenericFilter } from '../../generics/generic.filter';
import { BooleanFilter } from './../../generics/boolean.filter';

export class AlimentoFilter extends GenericFilter {
    private inativo: BooleanFilter;
    private nome: string;
    
    constructor() {
        super();
    }

    public getInativo() {
        return this.inativo;
    }
    
    public setInativo(i) {
        this.inativo = i;
    }
    
    public getNome() {
        return this.nome;
    }
    
    public setNome(n) {
        this.nome = n;
    }
           
}