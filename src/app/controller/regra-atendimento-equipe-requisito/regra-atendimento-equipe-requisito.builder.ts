import { RegraAtendimentoEquipeRequisito } from './../../model/regra-atendimento-equipe-requisito';
import { RegraAtendimentoEquipe } from './../../model/regra-atendimento-equipe';
import { Equipe } from './../../model/equipe';
import { EquipeBuilder } from './../equipe/equipe.builder';
import { GenericBuilder } from './../../generics/generic.builder';

export class RegraAtendimentoEquipeRequisitoBuilder extends GenericBuilder {
    
    initialize(regraAtendimentoEquipeRequisito: RegraAtendimentoEquipeRequisito) {
        regraAtendimentoEquipeRequisito = new RegraAtendimentoEquipeRequisito();
        
        regraAtendimentoEquipeRequisito.setEquipe(new EquipeBuilder().initialize(new Equipe()));
        regraAtendimentoEquipeRequisito.setRegraAtendimentoEquipe(new RegraAtendimentoEquipe());
        
        return regraAtendimentoEquipeRequisito;
    }
    
    initializeList(regraAtendimentoEquipeRequisitos: Array<RegraAtendimentoEquipeRequisito>) {
        
        let array:Array<RegraAtendimentoEquipeRequisito> = new Array<RegraAtendimentoEquipeRequisito>();
        
        if(regraAtendimentoEquipeRequisitos === null || regraAtendimentoEquipeRequisitos === undefined)
            regraAtendimentoEquipeRequisitos = new Array<RegraAtendimentoEquipeRequisito>();
        
        for (let regraAtendimentoEquipeRequisito of regraAtendimentoEquipeRequisitos) {
            array.push(this.initialize(regraAtendimentoEquipeRequisito));
        }
        
        return array;
    }
    
    clone(regraAtendimentoEquipeRequisito: RegraAtendimentoEquipeRequisito): RegraAtendimentoEquipeRequisito {
        
        if (regraAtendimentoEquipeRequisito === null || regraAtendimentoEquipeRequisito === undefined)
            regraAtendimentoEquipeRequisito = new RegraAtendimentoEquipeRequisito();
        
        let cloneRegraAtendimentoEquipeRequisito = new RegraAtendimentoEquipeRequisito();
        cloneRegraAtendimentoEquipeRequisito.setId(this.getValue(regraAtendimentoEquipeRequisito,"getId"));
        cloneRegraAtendimentoEquipeRequisito.setVersion(this.getValue(regraAtendimentoEquipeRequisito,"getVersion"));
        
        cloneRegraAtendimentoEquipeRequisito.setEquipe(new EquipeBuilder().
                clone(this.getValue(regraAtendimentoEquipeRequisito,"getEquipe")));
        
        cloneRegraAtendimentoEquipeRequisito.setRegraAtendimentoEquipe(new RegraAtendimentoEquipe());
        
        return cloneRegraAtendimentoEquipeRequisito;
    }
    
    cloneList(regraAtendimentoEquipeRequisitos: Array<RegraAtendimentoEquipeRequisito>): Array<RegraAtendimentoEquipeRequisito> {
        let array:Array<RegraAtendimentoEquipeRequisito> = new Array<RegraAtendimentoEquipeRequisito>();
    
        if (regraAtendimentoEquipeRequisitos !== null && regraAtendimentoEquipeRequisitos !== undefined) { 
            for (let regraAtendimentoEquipeRequisito of regraAtendimentoEquipeRequisitos) {
                array.push(this.clone(regraAtendimentoEquipeRequisito));
            }
        }
        
        return array;
    }
    
}