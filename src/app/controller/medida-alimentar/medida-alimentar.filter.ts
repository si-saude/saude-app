import { GenericFilter } from '../../generics/generic.filter';

export class MedidaAlimentarFilter extends GenericFilter {
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