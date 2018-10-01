import { GenericFilter } from '../../generics/generic.filter';

export class AcaoIntervencaoFilter extends GenericFilter {
    private descricao: string;
   
    constructor() {
        super();
    }

    public getDescricao() {
        return this.descricao;
    }
    
    public setDescricao(n: string) {
        this.descricao = n;
    }
       
}