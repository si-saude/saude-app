import { GenericFilter } from './../../generics/generic.filter';

export class PossivelDanoSaudeFilter extends GenericFilter {
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
}