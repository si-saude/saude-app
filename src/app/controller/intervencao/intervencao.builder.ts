import { Intervencao } from './../../model/intervencao';
import { Equipe } from './../../model/equipe';
import { EquipeBuilder } from './../equipe/equipe.builder';
import { GenericBuilder } from './../../generics/generic.builder';

export class IntervencaoBuilder extends GenericBuilder{
    
    initialize(intervencao: Intervencao): Intervencao {
        intervencao = new Intervencao();
            
        intervencao.setEquipe(new EquipeBuilder().initialize(intervencao.getEquipe()));
        
        return intervencao;
    }
    
    initializeList(intervencoes: Array<Intervencao>) {
        
        let array:Array<Intervencao> = new Array<Intervencao>();
        
        if(intervencoes === null || intervencoes === undefined)
            intervencoes = new Array<Intervencao>();
        
        for (let intervencao of intervencoes) {
            array.push(this.initialize(intervencao));
        }
        
        return array;
    }
    
    clone(intervencao: Intervencao): Intervencao {        
        let cloneIntervencao = new Intervencao();
        
        if (intervencao === null || intervencao === undefined)
            intervencao = new Intervencao();
        
        cloneIntervencao.setId(this.getValue(intervencao, "getId"));
        cloneIntervencao.setVersion(this.getValue(intervencao, "getVersion"));
        cloneIntervencao.setDescricao(this.getValue(intervencao, "getDescricao"));
        cloneIntervencao.setInativo(this.getValue(intervencao, "getInativo"));
        
        cloneIntervencao.setEquipe(new EquipeBuilder().clone(this.getValue(intervencao, "getEquipe")));
        
        return cloneIntervencao;
    }
    
    cloneList(intervencoes: Array<Intervencao>){
        
        if(intervencoes === null || intervencoes === undefined)
            intervencoes = new Array<Intervencao>();
        
        let array:Array<Intervencao> = new Array<Intervencao>();
    
        for (let intervencao of intervencoes) {
            array.push(this.clone(intervencao));
        }
    
        return array;
    }
    
}