import { GenericFilter } from './../../generics/generic.filter';

export class FonteGeradoraFilter extends GenericFilter {
    private Descricao: string;
   
    constructor() {
        super();
    }

    public getDescricao() {
        return this.Descricao;
    }
    
    public setDescricao(n: string) {
        this.Descricao = n;
    }
       
}