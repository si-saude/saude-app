import { Equipe } from './../../model/equipe';
import { RegraAtendimento } from './../../model/regra-atendimento';
import { RegraAtendimentoEquipe } from './../../model/regra-atendimento-equipe';
import { RegraAtendimentoEquipeRequisito } from './../../model/regra-atendimento-equipe-requisito';
import { RegraAtendimentoEquipeRequisitoBuilder } from './../regra-atendimento-equipe-requisito/regra-atendimento-equipe-requisito.builder';
import { EquipeBuilder } from './../equipe/equipe.builder';
import { GenericBuilder } from './../../generics/generic.builder';
 
export class RegraAtendimentoEquipeBuilder extends GenericBuilder {
    
    initialize(regraAtendimentoEquipe: RegraAtendimentoEquipe) {
        regraAtendimentoEquipe = new RegraAtendimentoEquipe();
        
        regraAtendimentoEquipe.setEquipe(new EquipeBuilder().initialize(new Equipe()));
        regraAtendimentoEquipe.setRegraAtendimento(new RegraAtendimento());
        regraAtendimentoEquipe.setRegraAtendimentoEquipeRequisitos(
                new RegraAtendimentoEquipeRequisitoBuilder().initializeList(new Array<RegraAtendimentoEquipeRequisito>()));
        
        return regraAtendimentoEquipe;
    }
    
    initializeList(regraAtendimentoEquipes: Array<RegraAtendimentoEquipe>) {
        
        let array:Array<RegraAtendimentoEquipe> = new Array<RegraAtendimentoEquipe>();
        
        if(regraAtendimentoEquipes === null || regraAtendimentoEquipes === undefined)
            regraAtendimentoEquipes = new Array<RegraAtendimentoEquipe>();
        
        for (let regraAtendimentoEquipe of regraAtendimentoEquipes) {
            array.push(this.initialize(regraAtendimentoEquipe));
        }
        
        return array;
    }
    
    clone(regraAtendimentoEquipe: RegraAtendimentoEquipe): RegraAtendimentoEquipe {
        
        if (regraAtendimentoEquipe === null || regraAtendimentoEquipe === undefined)
            regraAtendimentoEquipe = new RegraAtendimentoEquipe();
        
        let cloneRegraAtendimentoEquipe = new RegraAtendimentoEquipe();
        cloneRegraAtendimentoEquipe.setId(this.getValue(regraAtendimentoEquipe,"getId"));
        cloneRegraAtendimentoEquipe.setVersion(this.getValue(regraAtendimentoEquipe,"getVersion"));
        cloneRegraAtendimentoEquipe.setAcolhimento(this.getValue(regraAtendimentoEquipe,"getAcolhimento"));
        
        cloneRegraAtendimentoEquipe.setEquipe(new EquipeBuilder().
                clone(this.getValue(regraAtendimentoEquipe,"getEquipe")));
        cloneRegraAtendimentoEquipe.setRegraAtendimentoEquipeRequisitos(
                new RegraAtendimentoEquipeRequisitoBuilder().cloneList(
                        this.getValue(regraAtendimentoEquipe,"getRegraAtendimentoEquipeRequisitos")));
        cloneRegraAtendimentoEquipe.setRegraAtendimento(new RegraAtendimento());
        
        return cloneRegraAtendimentoEquipe;
    }
    
    cloneList(regraAtendimentoEquipes: Array<RegraAtendimentoEquipe>): Array<RegraAtendimentoEquipe> {
        let array:Array<RegraAtendimentoEquipe> = new Array<RegraAtendimentoEquipe>();
    
        if (regraAtendimentoEquipes !== null && regraAtendimentoEquipes !== undefined) { 
            for (let regraAtendimentoEquipe of regraAtendimentoEquipes) {
                array.push(this.clone(regraAtendimentoEquipe));
            }
        }
        
        return array;
    }
    
}