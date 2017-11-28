import { Equipe } from './../../model/equipe';
import { GenericBuilder } from './../../generics/generic.builder';

export class EquipeBuilder extends GenericBuilder {
    
    initialize(equipe: Equipe) { 
        equipe = new Equipe();
        return equipe;
    }
    
    clone(equipe: Equipe): Equipe {
        if (equipe === null || equipe === undefined)
            equipe = new Equipe();
        
        let cloneEquipe: Equipe = new Equipe();
        
        cloneEquipe.setId(this.getValue(equipe,"getId"));
        cloneEquipe.setNome(this.getValue(equipe,"getNome"));
        cloneEquipe.setAbreviacao(this.getValue(equipe, "getAbreviacao"));
        cloneEquipe.setVersion(this.getValue(equipe,"getVersion"));
    
        return cloneEquipe;
    }
    
}