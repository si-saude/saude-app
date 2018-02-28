import { EquipeFilter } from './../equipe/equipe.filter';
import { GenericFilter } from './../../generics/generic.filter';
import { BooleanFilter } from './../../generics/boolean.filter';

export class IntervencaoFilter extends GenericFilter {
    private equipe: EquipeFilter = new EquipeFilter();
    private descricao: string;
    private inativo: BooleanFilter = new BooleanFilter();

    public getInativo() {
        return this.inativo
    }
    
    public setInativo(inativo: BooleanFilter) {
        this.inativo = inativo;
    }

    public getEquipe() {
        return this.equipe;
    }
    
    public setEquipe(equipe: EquipeFilter) {
        this.equipe = equipe;
    }

    public getDescricao() {
        return this.descricao;
    }
    
    public setDescricao(descricao: string) {
        this.descricao = descricao;
    }
    
}