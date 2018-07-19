import { GenericFilter } from '../../generics/generic.filter';

export class EnfaseFilter extends GenericFilter {
    private descricao: string;
    
    constructor() {
        super();
    }

    public getDescricao() {
        return this.descricao;
    }
    
    public setDescricao(descricao: string) {
        this.descricao = descricao;
    }
       
}