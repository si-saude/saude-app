import { GenericFilter } from './../../generics/generic.filter';

export class PeriodicidadeFilter extends GenericFilter {
    private descricao: string;

    public getDescricao() {
        return this.descricao;
    }
    
    public setDescricao(descricao: string) {
        this.descricao = t;
    }
    
}