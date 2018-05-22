import { GenericFilter } from './../../generics/generic.filter';

export class CategoriaRiscoFilter extends GenericFilter {
    private descricao: string;
    private observacao: string;
   
    constructor() {
        super();
    }

    public getDescricao() {
        return this.descricao;
    }
    
    public setDescricao(descricao: string) {
        this.descricao = descricao;
    }
    
    public getObservacao() {
        return this.observacao;
    }
    
    public setObservacao(observacao: string) {
        this.observacao = observacao;
    }
       
}