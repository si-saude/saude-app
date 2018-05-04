import { EquipeFilter } from './../equipe/equipe.filter';
import { GenericFilter } from './../../generics/generic.filter';

export class NotificacaoFilter extends GenericFilter {
    private descricao: string;
    private equipe: EquipeFilter;

    getDescricao() {
        return this.descricao;
    }
    
    setDescricao(descricao: string) {
        this.descricao = descricao;
    }
    
    getEquipe() {
        return this.equipe;
    }
    
    setEquipe(equipe: EquipeFilter) {
        this.equipe = equipe;
    }
    
}