import { GenericFilter } from '../../generics/generic.filter';

export class AtividadeFisicaFilter extends GenericFilter {
    private descricao: string;

    getDescricao() {
        return this.descricao;
    }
    
    setDescricao(descricao) {
        this.descricao = descricao;
    }
}