import { GenericFilter } from '../../generics/generic.filter';
import { EquipeFilter } from './../equipe/equipe.filter';

export class AcaoIntervencaoFilter extends GenericFilter {
    private descricao: string;
    private equipe: EquipeFilter;
   
    constructor() {
        super();
    }
    
    getEquipe() {
        return this.equipe;
    }
    
    setEquipe(e: EquipeFilter) {
        this.equipe= e;
    }

    public getDescricao() {
        return this.descricao;
    }
    
    public setDescricao(n: string) {
        this.descricao = n;
    }
       
}