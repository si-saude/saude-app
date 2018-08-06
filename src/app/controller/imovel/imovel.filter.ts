import { BaseFilter } from './../base/base.filter';
import { GenericFilter } from '../../generics/generic.filter';

export class ImovelFilter extends GenericFilter {
    private nome: string;
    private base: BaseFilter;
   
    constructor() {
        super();
    }

    public getNome() {
        return this.nome;
    }
    
    public setNome(n: string) {
        this.nome = n;
    }
    
    public getBase() {
        return this.base;
    }
    
    public setBase(base: BaseFilter) {
        this.base = base;
    }
       
}