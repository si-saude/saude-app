import { EquipeFilter } from './../equipe/equipe.filter';
import { GenericFilter } from './../../generics/generic.filter';

export class EixoFilter extends GenericFilter {
    private titulo: string;
    private equipe: EquipeFilter;
    
    getTitulo() {
        return this.titulo;
    }
    
    setTitulo(titulo: string) {
        this.titulo = titulo;
    }
    
    getEquipe() {
        return this.equipe;
    }
    
    setEquipe(equipe: EquipeFilter) {
        this.equipe = equipe;
    }
        
}